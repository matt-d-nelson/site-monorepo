import {
  ButtonComponent,
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
    PageWrapperComponent,
    ButtonComponent,
    InputComponent,
    FormsModule,
    ReactiveFormsModule,
    ImgInputComponent,
    NgScrollbar,
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
  draftAlbumId = signal<string | null>(null)
  albumForm = new FormGroup({
    coverArt: new FormControl<File | null>(null, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    releaseDate: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  })
  trackForm = new FormGroup({
    trackPlacement: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    lyrics: new FormControl(''),
    audioFile: new FormControl<File | null>(null, [Validators.required]),
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

  initAlbumDraft() {
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
    // TS is nervous
    const draftId = this.draftAlbumId()
    if (draftId === null) {
      return
    }

    // confirm cancel
    this.closeAlbumFormDialog()
    this.spinnerService.show()
    // loop through tracks to delete and fork join the whole thang
    const successMsg: ToastMessage = {
      type: 'success',
      message: `Album creation canceled`,
    }
    const errorMsg: ToastMessage = {
      type: 'error',
      message: `Whoops, try again`,
    }
    this.albumsService
      .deleteAlbum(this.orgId(), draftId)
      .pipe(finalize(() => this.spinnerService.hide()))
      .subscribe({
        next: () => {
          this.toastService.showToast(successMsg)
        },
        error: () => {
          this.toastService.showToast(errorMsg)
        },
      })
  }

  publishAlbumDraft() {
    console.log('sup')
  }

  openAlbumFormDialog() {
    this.dialog.nativeElement.showModal()
  }

  closeAlbumFormDialog() {
    this.dialog.nativeElement.close()
  }
}
