import {
  ButtonComponent,
  FileInputComponent,
  ImgInputComponent,
  InputComponent,
  PageWrapperComponent,
} from '@angular-monorepo/core-ui'
import { BUTTON_TYPES, CORE_COLORS } from '@angular-monorepo/shared-constants'
import { ToastMessage } from '@angular-monorepo/shared-models'
import {
  AlbumsService,
  AuthService,
  ConfirmationDialogService,
  OrgService,
  ToastService,
} from '@angular-monorepo/shared-services'
import { CommonModule } from '@angular/common'
import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core'
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { NgScrollbar } from 'ngx-scrollbar'
import { NgxSpinnerService } from 'ngx-spinner'
import { finalize } from 'rxjs'

// TODO: This component could be broken up
@Component({
  selector: 'shared-ui-albums-page',
  standalone: true,
  imports: [
    CommonModule,
    PageWrapperComponent,
    ButtonComponent,
    InputComponent,
    FormsModule,
    ReactiveFormsModule,
    ImgInputComponent,
    NgScrollbar,
    FileInputComponent,
  ],
  templateUrl: './albums-page.component.html',
  styleUrl: './albums-page.component.scss',
})
export class AlbumsPageComponent implements OnInit {
  constructor(
    private albumsService: AlbumsService,
    private orgService: OrgService,
    private confirmationDialogService: ConfirmationDialogService,
    private authService: AuthService,
    private toastService: ToastService,
    private spinnerService: NgxSpinnerService
  ) {}

  BUTTON_TYPES = signal(BUTTON_TYPES)
  CORE_COLORS = signal(CORE_COLORS)

  orgId = signal<string>('')
  userIsAdmin = signal<boolean>(false)

  // form management
  @ViewChild('albumFormDialog', { static: true })
  dialog!: ElementRef<HTMLDialogElement>
  dialogLoading = signal<boolean>(false)
  // Albums
  draftAlbumId = signal<string | null>(null)
  albumForm = new FormGroup({
    coverArt: new FormControl<File | null>(null, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    releaseDate: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  })
  // Tracks
  draftAlbumTracks = signal<any[]>([])
  trackForm = new FormGroup({
    trackPlacement: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    lyrics: new FormControl(''),
    file: new FormControl<any>(null, [Validators.required]),
  })

  ngOnInit(): void {
    this.orgService.currentOrgId$.subscribe(orgId => {
      this.orgId.set(orgId)
      this.userIsAdmin.set(this.authService.isUserAdmin(orgId))
      this.getAndSortAlbums(orgId)
    })
  }

  getAndSortAlbums(orgId: string) {
    this.albumsService.getAlbums(orgId)
    this.albumsService.albums$.subscribe((albums: any) => {
      console.log(albums)
      // sort albums by isDraft
    })
  }

  openAlbumFormDialog() {
    this.dialog.nativeElement.showModal()
  }

  closeAlbumFormDialog() {
    this.dialog.nativeElement.close()
    this.albumForm.reset()
    this.trackForm.reset()
    this.draftAlbumId.set(null)
  }

  // -------------------- Albums -------------------- //

  initAlbumDraft() {
    //TEMP
    this.draftAlbumId.set('8')
    this.openAlbumFormDialog()
    this.refreshDraftAlbumTracks('8')

    // this.spinnerService.show()
    // this.albumsService
    //   .createAlbumDraft(this.orgId())
    //   .pipe(finalize(() => this.spinnerService.hide()))
    //   .subscribe({
    //     next: (draftAlbum: any) => {
    //       this.draftAlbumId.set(draftAlbum.id)
    //       this.openAlbumFormDialog()
    //     },
    //     error: () => {
    //       this.toastService.showToast({
    //         type: 'error',
    //         message: 'Whoops, try again',
    //       })
    //     },
    //   })
  }

  cancelAlbumDraft() {
    const successMsg: ToastMessage = {
      type: 'success',
      message: `Album creation canceled`,
    }
    const errorMsg: ToastMessage = {
      type: 'error',
      message: `Whoops, try again`,
    }

    const draftId = this.draftAlbumId()
    if (!draftId) {
      this.toastService.showToast(errorMsg)
      return
    }
    // this.dialogLoading.set(true)

    // this.albumsService.deleteAlbum(this.orgId(), draftId).subscribe({
    //   next: () => {
    //     this.dialogLoading.set(false)
    //     this.closeAlbumFormDialog()
    //     this.toastService.showToast(successMsg)
    //   },
    //   error: () => {
    //     this.dialogLoading.set(false)
    //     this.toastService.showToast(errorMsg)
    //   },
    // })
  }

  publishAlbumDraft() {
    console.log('sup')
  }

  // -------------------- Tracks -------------------- //
  createTrack() {
    //TODO: I like the idea of just adding these to a config
    const successMsg: ToastMessage = {
      type: 'success',
      message: `Track Created`,
    }
    const errorMsg: ToastMessage = {
      type: 'error',
      message: `Error creating track`,
    }

    const draftId = this.draftAlbumId()
    if (!draftId) {
      this.toastService.showToast(errorMsg)
      return
    }
    if (!this.trackForm.valid) {
      this.trackForm.markAllAsTouched()
      return
    }

    const trackValues = this.trackForm.value
    const data = new FormData()
    trackValues.name && data.append('name', trackValues.name)
    trackValues.lyrics && data.append('lyrics', trackValues.lyrics)
    trackValues.trackPlacement &&
      data.append('trackPlacement', trackValues.trackPlacement)
    trackValues.file && data.append('audio', trackValues.file)

    this.dialogLoading.set(true)
    this.albumsService.createAlbumTrack(this.orgId(), draftId, data).subscribe({
      next: () => {
        this.dialogLoading.set(false)
        this.toastService.showToast(successMsg)
        this.trackForm.reset()
        this.refreshDraftAlbumTracks(draftId)
      },
      error: () => {
        this.dialogLoading.set(false)
        this.toastService.showToast(errorMsg)
      },
    })
  }

  refreshDraftAlbumTracks(draftId: string) {
    this.dialogLoading.set(true)
    this.albumsService.getAlbumTracks(draftId).subscribe({
      next: (res: any) => {
        this.dialogLoading.set(false)
        this.draftAlbumTracks.set(res)
      },
    })
  }

  deleteTrack(track: any) {
    console.log('wtf', track)
    const successMsg: ToastMessage = {
      type: 'success',
      message: `Track deleted`,
    }
    const errorMsg: ToastMessage = {
      type: 'error',
      message: `Error deleting track`,
    }

    this.dialogLoading.set(true)
    this.albumsService
      .deleteAlbumTrack(this.orgId(), track.id, track.audioId)
      .subscribe({
        next: () => {
          this.dialogLoading.set(false)
          this.toastService.showToast(successMsg)
          const draftId = this.draftAlbumId()
          if (draftId) this.refreshDraftAlbumTracks(draftId)
        },
        error: () => {
          this.dialogLoading.set(false)
          this.toastService.showToast(errorMsg)
        },
      })
  }
}
