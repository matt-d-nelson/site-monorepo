import { ButtonComponent } from '@angular-monorepo/core-ui'
import { Component, OnInit, signal } from '@angular/core'
import { FormDialogComponent } from '../form-dialog/form-dialog.component'
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
import { isEmpty } from 'lodash'
import { ToastMessage } from '@angular-monorepo/shared-models'
import { finalize } from 'rxjs'
import {
  CreateVideoDialogConfig,
  UpdateVideoDialogConfig,
} from './videos-page.config'

@Component({
  selector: 'shared-ui-videos-page',
  standalone: true,
  imports: [CommonModule, FormDialogComponent, ButtonComponent],
  templateUrl: './videos-page.component.html',
  styleUrl: './videos-page.component.scss',
})
export class VideosPageComponent implements OnInit {
  constructor(
    private videosService: VideosService,
    private orgService: OrgService,
    private confirmationDialogService: ConfirmationDialogService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  BUTTON_TYPES = signal(BUTTON_TYPES)
  CORE_COLORS = signal(CORE_COLORS)
  orgId = signal<string>('')
  userIsAdmin = signal<boolean>(false)

  formDialogOpen = signal<boolean>(false)
  dialogLoading = signal<boolean>(false)
  createVideoConfig = signal<any>(CreateVideoDialogConfig(this))
  updateVideoConfig = signal<any>(UpdateVideoDialogConfig(this))
  previousVideoValue = signal<any>(null)
  activeDialogConfig = signal<any>(this.createVideoConfig())

  videos = signal<any[]>([])

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
      console.log(videos)
    })
  }

  addVideoClick() {
    this.activeDialogConfig.set(this.createVideoConfig())
    this.formDialogOpen.set(true)
  }

  editVideoClick(video: any) {}

  deleteVideoClick(video: any) {}

  createVideo() {
    const videoForm = this.createVideoConfig().form
    if (!videoForm.valid) {
      videoForm.markAllAsTouched()
      return
    }
    const successMsg: ToastMessage = {
      type: 'success',
      message: `The ${videoForm.get('name').value} video was created`,
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
}

// https://www.youtube.com/embed/0iiKwhQWwdI?si=IVpIyUdXWnUqcnUq
