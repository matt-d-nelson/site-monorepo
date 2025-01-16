import { ButtonComponent } from '@angular-monorepo/core-ui'
import { Component, OnInit, signal } from '@angular/core'
import {
  FormDialogComponent,
  PageWrapperComponent,
} from '@angular-monorepo/shared-ui'
import { BUTTON_TYPES, CORE_COLORS } from '@angular-monorepo/shared-constants'
import {
  AuthService,
  ConfirmationDialogService,
  OrgService,
  ToastService,
  VideosService,
} from '@angular-monorepo/shared-services'
import { CommonModule } from '@angular/common'
import { GetObjectDifference } from '@angular-monorepo/shared-utilities'
import { isEmpty } from 'lodash-es'
import {
  FormDialogConfig,
  ToastMessage,
  Video,
} from '@angular-monorepo/shared-models'
import { finalize } from 'rxjs'
import {
  CreateVideoDialogConfig,
  UpdateVideoDialogConfig,
} from './videos-page.config'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { NgScrollbarModule } from 'ngx-scrollbar'

@Component({
  selector: 'shared-pages-videos-page',
  standalone: true,
  imports: [
    CommonModule,
    FormDialogComponent,
    ButtonComponent,
    NgScrollbarModule,
    PageWrapperComponent,
  ],
  templateUrl: './videos-page.component.html',
  styleUrl: './videos-page.component.scss',
})
export class VideosPageComponent implements OnInit {
  constructor(
    private videosService: VideosService,
    private orgService: OrgService,
    private confirmationDialogService: ConfirmationDialogService,
    private authService: AuthService,
    private toastService: ToastService,
    private sanitizer: DomSanitizer
  ) {}

  BUTTON_TYPES = signal(BUTTON_TYPES)
  CORE_COLORS = signal(CORE_COLORS)
  orgId = signal<string>('')
  userIsAdmin = signal<boolean>(false)

  formDialogOpen = signal<boolean>(false)
  dialogLoading = signal<boolean>(false)
  createVideoConfig = signal<FormDialogConfig>(CreateVideoDialogConfig(this))
  updateVideoConfig = signal<FormDialogConfig>(UpdateVideoDialogConfig(this))
  previousVideoValue = signal<any>(null)
  activeDialogConfig = signal<FormDialogConfig>(this.createVideoConfig())

  videos = signal<Video[]>([])

  ngOnInit(): void {
    this.orgService.currentOrgId$.subscribe(orgId => {
      this.orgId.set(orgId)
      this.userIsAdmin.set(this.authService.isUserAdmin(orgId))
      this.getVideos(orgId)
    })
  }

  getVideos(orgId: string) {
    this.videosService.getVideos(orgId)
    this.videosService.videos$.subscribe(videos => {
      this.videos.set(videos)
    })
  }

  addVideoClick() {
    this.activeDialogConfig.set(this.createVideoConfig())
    this.formDialogOpen.set(true)
  }

  editVideoClick(video: Video) {
    this.activeDialogConfig.set(this.updateVideoConfig())
    this.activeDialogConfig().form.patchValue(video)
    this.previousVideoValue.set(video)
    this.formDialogOpen.set(true)
  }

  deleteVideoClick(video: Video) {
    const successMsg: ToastMessage = {
      type: 'success',
      message: `${video.name} was deleted`,
    }
    const errorMsg: ToastMessage = {
      type: 'error',
      message: `Error deleting bio`,
    }

    this.confirmationDialogService
      .openDialog({
        title: 'Delete Event',
        message: `Are you sure you want to delete ${video.name}?`,
        confirmText: 'Delete',
      })
      .subscribe((confirmed: boolean) => {
        if (!confirmed) return
        this.videosService.deleteVideo(this.orgId(), video.id).subscribe({
          next: () => {
            this.toastService.showToast(successMsg)
            this.videosService.getVideos(this.orgId())
          },
          error: () => {
            this.toastService.showToast(errorMsg)
          },
        })
      })
  }

  createVideo() {
    const videoForm = this.createVideoConfig().form
    if (!videoForm.valid) {
      videoForm.markAllAsTouched()
      return
    }
    const successMsg: ToastMessage = {
      type: 'success',
      message: `The ${videoForm.get('name')?.value} video was created`,
    }
    const errorMsg: ToastMessage = {
      type: 'error',
      message: `Error creating video`,
    }
    this.dialogLoading.set(true)
    this.videosService
      .createVideo(this.orgId(), videoForm.value)
      .pipe(finalize(() => this.dialogLoading.set(false)))
      .subscribe({
        next: () => {
          this.toastService.showToast(successMsg)
          this.videosService.getVideos(this.orgId())
          this.formDialogOpen.set(false)
        },
        error: () => {
          this.toastService.showToast(errorMsg)
        },
      })
  }

  updateVideo() {
    const videoUpdateForm = this.updateVideoConfig().form
    if (!videoUpdateForm.valid) {
      videoUpdateForm.markAllAsTouched()
      return
    }

    const videoDif = GetObjectDifference(
      this.previousVideoValue(),
      videoUpdateForm.value
    )
    if (isEmpty(videoDif)) {
      this.toastService.showToast({
        type: 'error',
        message: 'No updates detected',
      })
      return
    }

    const successMsg: ToastMessage = {
      type: 'success',
      message: `${videoUpdateForm.get('name')?.value} was updated`,
    }
    const errorMsg: ToastMessage = {
      type: 'error',
      message: `Error updating event`,
    }
    this.dialogLoading.set(true)
    this.videosService
      .updateVideo(this.orgId(), videoUpdateForm.get('id')?.value, videoDif)
      .pipe(finalize(() => this.dialogLoading.set(false)))
      .subscribe({
        next: () => {
          this.toastService.showToast(successMsg)
          this.videosService.getVideos(this.orgId())
          this.formDialogOpen.set(false)
        },
        error: () => {
          this.toastService.showToast(errorMsg)
        },
      })
  }

  isSafeVideoUrl(url: string): boolean {
    const allowedDomains = ['youtube.com', 'youtu.be', 'vimeo.com']

    try {
      const parsedUrl = new URL(url)
      return allowedDomains.some(domain => parsedUrl.hostname.includes(domain))
    } catch {
      return false
    }
  }

  getSafeVideoUrl(url: string): SafeResourceUrl | null {
    if (this.isSafeVideoUrl(url)) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url)
    }
    return null
  }
}
