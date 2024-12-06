import {
  ButtonComponent,
  ImgInputComponent,
  LazyImgComponent,
} from '@angular-monorepo/core-ui'
import { Component, OnInit, signal } from '@angular/core'
import { FormDialogComponent } from '../form-dialog/form-dialog.component'
import { CreateAboutDialogConfig, UpdateAboutDialogConfig } from './about-page.config'
import { BUTTON_TYPES, CORE_COLORS, ORGIDS } from '@angular-monorepo/shared-constants'
import {
  AboutService,
  AuthService,
  ConfirmationDialogService,
  OrgService,
} from '@angular-monorepo/shared-services'
import { CommonModule } from '@angular/common'
import { GetObjectDifference } from '@angular-monorepo/shared-utilities'
import { isEmpty } from 'lodash'

@Component({
  selector: 'shared-ui-about-page',
  standalone: true,
  imports: [
    CommonModule,
    ImgInputComponent,
    FormDialogComponent,
    ButtonComponent,
    LazyImgComponent,
  ],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
})
export class AboutPageComponent implements OnInit {
  BUTTON_TYPES = signal(BUTTON_TYPES)
  CORE_COLORS = signal(CORE_COLORS)
  orgId = signal<string>('')
  userIsAdmin = signal<boolean>(false)

  formDialogOpen = signal<boolean>(false)
  createBioDialogConfig = signal<any>(CreateAboutDialogConfig(this))
  updateBioDialogConfig = signal<any>(UpdateAboutDialogConfig(this))
  previousBioValue = signal<any>(null)

  activeDialogConfig = signal<any>(this.createBioDialogConfig())

  bios = signal<any[]>([])
  primaryBio = signal<any>(null)

  constructor(
    private aboutService: AboutService,
    private orgService: OrgService,
    private confirmationDialogService: ConfirmationDialogService,
    private authService: AuthService
  ) {}

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
      image: bio.imageUrl
    }
    this.activeDialogConfig().form.patchValue(previousBio)
    this.previousBioValue.set(previousBio)
    this.formDialogOpen.set(true)
  }

  deleteBioClick(bio: any) {
    this.confirmationDialogService
      .openDialog({
        title: 'Delete Bio',
        message: `Are you sure you want to delete ${bio.name}'s bio?`,
        confirmText: 'Delete',
      })
      .subscribe((confirmed: boolean) => {
        if(!confirmed) return
        this.aboutService.deleteBio(this.orgId(), bio.id, bio.imageId).subscribe((res) => {
          this.aboutService.getBios(this.orgId())
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
    const imageFile = bioForm.get('image')
    data.append('image', imageFile.value, imageFile.name)

    this.aboutService.createBio(this.orgId(), data).subscribe(res => {
      // TODO: add success and error messaging / Also add error messaging for img input
      this.aboutService.getBios(this.orgId())
      this.formDialogOpen.set(false)
    })
  }

  updateBio() {
    const bioUpdateForm = this.updateBioDialogConfig().form
    console.log(bioUpdateForm.value, bioUpdateForm.valid)
    if(!bioUpdateForm.valid) {
      bioUpdateForm.markAllAsTouched()
      return
    }

    const bioDif = GetObjectDifference(this.previousBioValue(), bioUpdateForm.value)
    if(isEmpty(bioDif)) {
      bioUpdateForm.markAllAsTouched()
      // message no change detected
      return
    }

    const data = new FormData()
    bioDif.name && data.append('name', bioDif.name)
    bioDif.biography && data.append('biography', bioDif.biography)
    if(bioDif.isPrimary !== undefined) {
      data.append('isPrimary', bioDif.isPrimary)
    } 
    if(bioDif.image) {
      data.append('imageId', bioUpdateForm.get('imageId').value)
      data.append('image', bioDif.image, bioDif.image.name)
    }

    this.aboutService.updateBio(this.orgId(), bioUpdateForm.get('id').value, data).subscribe((res) => {
      this.aboutService.getBios(this.orgId())
      this.formDialogOpen.set(false)
    })

  }
}
