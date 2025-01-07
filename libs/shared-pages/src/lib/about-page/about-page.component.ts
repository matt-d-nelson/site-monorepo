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
import {
  AboutData,
  FormDialogConfig,
  ToastMessage,
} from '@angular-monorepo/shared-models'
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
  createBioDialogConfig = signal<FormDialogConfig>(
    CreateAboutDialogConfig(this)
  )
  updateBioDialogConfig = signal<FormDialogConfig>(
    UpdateAboutDialogConfig(this)
  )
  previousBioValue = signal<any>(null)
  activeDialogConfig = signal<FormDialogConfig>(this.createBioDialogConfig())

  bios = signal<AboutData[]>([])
  primaryBio = signal<AboutData | null>(null)

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
      this.primaryBio.set(bios.find((bio: AboutData) => bio.isPrimary) || null)
      this.bios.set(bios.filter((bio: AboutData) => !bio.isPrimary))
    })
  }

  addBioClick() {
    this.activeDialogConfig.set(this.createBioDialogConfig())
    this.formDialogOpen.set(true)
  }

  editBioClick(bio: AboutData | null) {
    if (!bio) return
    this.activeDialogConfig.set(this.updateBioDialogConfig())
    const previousBio = {
      ...bio,
      image: bio.imageUrl,
    }
    this.activeDialogConfig().form.patchValue(previousBio)
    this.previousBioValue.set(previousBio)
    this.formDialogOpen.set(true)
  }

  deleteBioClick(bio: AboutData | null) {
    if (!bio) return
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
    //FormData is necesary for image encoding
    const bioData = bioForm.value
    const data = new FormData()
    data.append('name', bioData.name)
    data.append('biography', bioData.biography)
    data.append('isPrimary', bioData.isPrimary)
    data.append('image', bioData.image)

    const successMsg: ToastMessage = {
      type: 'success',
      message: `${bioData.name}'s bio was created`,
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

    const newBioValues = bioUpdateForm.value
    const bioDif = GetObjectDifference(this.previousBioValue(), newBioValues)
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
      data.append('imageId', newBioValues.imageId)
      data.append('image', bioDif.image, bioDif.image.name)
    }

    const successMsg: ToastMessage = {
      type: 'success',
      message: `${newBioValues.name}'s bio was updated`,
    }
    const errorMsg: ToastMessage = {
      type: 'error',
      message: `Error updating bio`,
    }
    this.dialogLoading.set(true)
    this.aboutService
      .updateBio(this.orgId(), newBioValues.id, data)
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
