import {
  ButtonComponent,
  ImgInputComponent,
  LazyImgComponent,
} from '@angular-monorepo/core-ui'
import { Component, OnInit, signal } from '@angular/core'
import {
  FormDialogComponent,
  PageWrapperComponent,
} from '@angular-monorepo/shared-ui'
import {
  CreateAboutDialogConfig,
  UpdateAboutDialogConfig,
} from './about-page.config'
import { BUTTON_TYPES, CORE_COLORS } from '@angular-monorepo/shared-constants'
import {
  AboutService,
  AuthService,
  ConfirmationDialogService,
  OrgService,
  ToastService,
} from '@angular-monorepo/shared-services'
import { CommonModule } from '@angular/common'
import { GetObjectDifference } from '@angular-monorepo/shared-utilities'
import { isEmpty } from 'lodash'
import { ToastMessage } from '@angular-monorepo/shared-models'
import { finalize } from 'rxjs'
import { NgScrollbarModule } from 'ngx-scrollbar'

@Component({
  selector: 'shared-ui-about-page',
  standalone: true,
  imports: [
    CommonModule,
    ImgInputComponent,
    FormDialogComponent,
    ButtonComponent,
    LazyImgComponent,
    NgScrollbarModule,
    PageWrapperComponent,
  ],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
})
export class AboutPageComponent implements OnInit {
  constructor(
    private aboutService: AboutService,
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
  createBioDialogConfig = signal<any>(CreateAboutDialogConfig(this))
  updateBioDialogConfig = signal<any>(UpdateAboutDialogConfig(this))
  previousBioValue = signal<any>(null)
  activeDialogConfig = signal<any>(this.createBioDialogConfig())

  bios = signal<any[]>([])
  primaryBio = signal<any>(null)

  ngOnInit(): void {
    this.orgService.currentOrgId$.subscribe(orgId => {
      this.orgId.set(orgId)
      this.userIsAdmin.set(this.authService.isUserAdmin(orgId))
      this.getAndFilterBios(orgId)
    })
  }

  getAndFilterBios(orgId: string) {
    this.aboutService.getBios(orgId)
    this.aboutService.bios$.subscribe(bios => {
      this.primaryBio.set(bios.find((bio: any) => bio.isPrimary))
      this.bios.set(bios.filter((bio: any) => !bio.isPrimary))
    })
  }

  addBioClick() {
    this.activeDialogConfig.set(this.createBioDialogConfig())
    this.formDialogOpen.set(true)
  }

  editBioClick(bio: any) {
    this.activeDialogConfig.set(this.updateBioDialogConfig())
    const previousBio = {
      ...bio,
      image: bio.imageUrl,
    }
    this.activeDialogConfig().form.patchValue(previousBio)
    this.previousBioValue.set(previousBio)
    this.formDialogOpen.set(true)
  }

  deleteBioClick(bio: any) {
    const successMsg: ToastMessage = {
      type: 'success',
      message: `${bio.name} was deleted`,
    }
    const errorMsg: ToastMessage = {
      type: 'error',
      message: `Error deleting bio`,
    }

    this.confirmationDialogService
      .openDialog({
        title: 'Delete Bio',
        message: `Are you sure you want to delete ${bio.name}'s bio?`,
        confirmText: 'Delete',
      })
      .subscribe((confirmed: boolean) => {
        if (!confirmed) return
        this.aboutService
          .deleteBio(this.orgId(), bio.id, bio.imageId)
          .subscribe({
            next: () => {
              this.toastService.showToast(successMsg)
              this.aboutService.getBios(this.orgId())
            },
            error: () => {
              this.toastService.showToast(errorMsg)
            },
          })
      })
  }

  createBio() {
    const bioForm = this.createBioDialogConfig().form
    if (!bioForm.valid) {
      bioForm.markAllAsTouched()
      return
    }
    //FormData is necesary to attach image file in the way the BE can understand
    const data = new FormData()
    data.append('name', bioForm.get('name').value)
    data.append('biography', bioForm.get('biography').value)
    data.append('isPrimary', bioForm.get('isPrimary').value)
    data.append('image', bioForm.get('image').value)

    const successMsg: ToastMessage = {
      type: 'success',
      message: `${bioForm.get('name').value}'s bio was created`,
    }
    const errorMsg: ToastMessage = {
      type: 'error',
      message: `Error creating bio`,
    }
    this.dialogLoading.set(true)
    this.aboutService
      .createBio(this.orgId(), data)
      .pipe(finalize(() => this.dialogLoading.set(false)))
      .subscribe({
        next: () => {
          this.toastService.showToast(successMsg)
          this.aboutService.getBios(this.orgId())
          this.formDialogOpen.set(false)
        },
        error: () => {
          this.toastService.showToast(errorMsg)
        },
      })
  }

  updateBio() {
    const bioUpdateForm = this.updateBioDialogConfig().form
    if (!bioUpdateForm.valid) {
      bioUpdateForm.markAllAsTouched()
      return
    }

    const bioDif = GetObjectDifference(
      this.previousBioValue(),
      bioUpdateForm.value
    )
    if (isEmpty(bioDif)) {
      this.toastService.showToast({
        type: 'error',
        message: 'No updates detected',
      })
      return
    }

    const data = new FormData()
    bioDif.name && data.append('name', bioDif.name)
    bioDif.biography && data.append('biography', bioDif.biography)
    if (bioDif.isPrimary !== undefined) {
      data.append('isPrimary', bioDif.isPrimary)
    }
    if (bioDif.image) {
      data.append('imageId', bioUpdateForm.get('imageId').value)
      data.append('image', bioDif.image, bioDif.image.name)
    }

    const successMsg: ToastMessage = {
      type: 'success',
      message: `${bioUpdateForm.get('name').value}'s bio was updated`,
    }
    const errorMsg: ToastMessage = {
      type: 'error',
      message: `Error updating bio`,
    }
    this.dialogLoading.set(true)
    this.aboutService
      .updateBio(this.orgId(), bioUpdateForm.get('id').value, data)
      .pipe(finalize(() => this.dialogLoading.set(false)))
      .subscribe({
        next: () => {
          this.toastService.showToast(successMsg)
          this.aboutService.getBios(this.orgId())
          this.formDialogOpen.set(false)
        },
        error: () => {
          this.toastService.showToast(errorMsg)
        },
      })
  }
}
