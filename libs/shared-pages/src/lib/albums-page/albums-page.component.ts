import {
  AudioProgressComponent,
  ButtonComponent,
  FileInputComponent,
  ImgInputComponent,
  InputComponent,
  LazyImgComponent,
  PlayButtonComponent,
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
import { PageWrapperComponent } from '@angular-monorepo/shared-ui'
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
    PlayButtonComponent,
    LazyImgComponent,
    AudioProgressComponent,
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
  publishedAlbums = signal<any[]>([])
  draftAlbums = signal<any[]>([])
  expandedLyrics = signal<Set<string>>(new Set())

  // form management
  @ViewChild('albumFormDialog', { static: true })
  dialog!: ElementRef<HTMLDialogElement>
  dialogLoading = signal<boolean>(false)
  // albums
  draftAlbumId = signal<string | null>(null)
  albumForm = new FormGroup({
    coverArt: new FormControl<Blob | null>(null, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    releaseDate: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  })
  // tracks
  draftAlbumTracks = signal<any[]>([])
  trackForm = new FormGroup({
    trackPlacement: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    lyrics: new FormControl(''),
    file: new FormControl<File | null>(null, [Validators.required]),
  })

  ngOnInit(): void {
    this.orgService.currentOrgId$.subscribe(orgId => {
      this.orgId.set(orgId)
      this.userIsAdmin.set(this.authService.isUserAdmin(orgId))
      this.albumsService.getAlbums(orgId)
      this.initSortAlbumsSub()
    })
  }

  toggleLyrics(trackId: string) {
    if (this.expandedLyrics().has(trackId)) {
      this.expandedLyrics().delete(trackId)
    } else {
      this.expandedLyrics().add(trackId)
    }
  }

  initSortAlbumsSub() {
    this.albumsService.albums$.subscribe((albums: any) => {
      this.draftAlbums.set([])
      this.publishedAlbums.set([])
      albums.forEach((album: any) => {
        album.isDraft
          ? this.draftAlbums().push(album)
          : this.publishedAlbums().push(album)
      })
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
    this.draftAlbumTracks.set([])
  }

  // -------------------- Albums -------------------- //

  initAlbumDraft() {
    if (this.draftAlbums().length > 0) {
      this.toastService.showToast({
        type: 'error',
        message:
          'Please publish or delete existing album draft before adding another',
      })
      return
    }
    this.spinnerService.show()
    this.albumsService
      .createAlbumDraft(this.orgId())
      .pipe(finalize(() => this.spinnerService.hide()))
      .subscribe({
        next: (draftAlbum: any) => {
          this.draftAlbumId.set(draftAlbum.id)
          this.openAlbumFormDialog()
        },
        error: () => {
          this.toastService.showToast({
            type: 'error',
            message: 'Whoops, try again',
          })
        },
      })
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

    this.confirmationDialogService
      .openDialog({
        title: 'Delete Album',
        message: `Are you sure you want to cancel? Progress will not be saved`,
      })
      .subscribe((confirmed: boolean) => {
        if (!confirmed) return
        this.dialogLoading.set(true)
        this.albumsService.deleteAlbum(this.orgId(), draftId).subscribe({
          next: () => {
            this.dialogLoading.set(false)
            this.closeAlbumFormDialog()
            this.toastService.showToast(successMsg)
          },
          error: () => {
            this.dialogLoading.set(false)
            this.toastService.showToast(errorMsg)
          },
        })
      })
  }

  publishAlbumDraft() {
    if (!this.albumForm.valid) {
      this.albumForm.markAllAsTouched()
      return
    }

    this.confirmationDialogService
      .openDialog({
        title: 'Publish Album',
        message: `Are you sure you want to publish this album?`,
      })
      .subscribe((confirmed: boolean) => {
        if (!confirmed) return
        const data = new FormData()
        const albumData = this.albumForm.value

        const successMsg: ToastMessage = {
          type: 'success',
          message: `${albumData.name} was created`,
        }
        const errorMsg: ToastMessage = {
          type: 'error',
          message: `Error creating album`,
        }

        const drafID = this.draftAlbumId()
        if (!drafID) {
          this.toastService.showToast(errorMsg)
          return
        }

        albumData?.name && data.append('name', albumData.name)
        albumData?.releaseDate &&
          data.append('releaseDate', albumData.releaseDate)
        albumData?.description &&
          data.append('description', albumData.description)
        albumData?.coverArt && data.append('image', albumData.coverArt)

        this.dialogLoading.set(true)
        this.albumsService
          .publishAlbumDraft(this.orgId(), drafID, data)
          .subscribe({
            next: () => {
              this.dialogLoading.set(false)
              this.toastService.showToast(successMsg)
              this.albumsService.getAlbums(this.orgId())
              this.closeAlbumFormDialog()
            },
            error: () => {
              this.toastService.showToast(errorMsg)
              this.dialogLoading.set(false)
            },
          })
      })
  }

  deleteAlbumClick(album: any) {
    const albumTitle = album?.name || 'unnamed draft'
    const successMsg: ToastMessage = {
      type: 'success',
      message: `${albumTitle} was deleted`,
    }
    const errorMsg: ToastMessage = {
      type: 'error',
      message: `Error deleting album`,
    }

    this.confirmationDialogService
      .openDialog({
        title: 'Delete Album',
        message: `Are you sure you want to delete ${albumTitle}?`,
      })
      .subscribe((confirmed: boolean) => {
        if (!confirmed) return
        this.spinnerService.show()
        this.albumsService
          .deleteAlbum(this.orgId(), album.id, album?.coverArtId)
          .subscribe({
            next: () => {
              this.spinnerService.hide()
              this.toastService.showToast(successMsg)
              this.albumsService.getAlbums(this.orgId())
            },
            error: () => {
              this.spinnerService.hide()
              this.toastService.showToast(errorMsg)
            },
          })
      })
  }

  // -------------------- Tracks -------------------- //
  refreshDraftAlbumTracks(draftId: string) {
    this.dialogLoading.set(true)
    this.albumsService.getAlbumTracks(draftId).subscribe({
      next: (res: any) => {
        this.dialogLoading.set(false)
        this.draftAlbumTracks.set(res)
      },
    })
  }

  createTrack() {
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

  deleteTrack(track: any) {
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
