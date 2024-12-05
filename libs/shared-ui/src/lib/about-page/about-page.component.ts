import {
  ButtonComponent,
  ImgInputComponent,
  LazyImgComponent,
} from '@angular-monorepo/core-ui'
import { Component, OnInit, signal } from '@angular/core'
import { FormDialogComponent } from '../form-dialog/form-dialog.component'
import { CreateAboutDialogConfig } from './about-page.config'
import { BUTTON_TYPES, CORE_COLORS } from '@angular-monorepo/shared-constants'
import { AboutService, OrgService } from '@angular-monorepo/shared-services'
import { CommonModule } from '@angular/common'

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

  formDialogOpen = signal<boolean>(false)
  createBioDialogConfig = signal<any>(CreateAboutDialogConfig(this))
  activeDialogConfig = signal<any>(this.createBioDialogConfig())

  bios = signal<any[]>([])
  primaryBio = signal<any>(null)

  constructor(
    private aboutService: AboutService,
    private orgService: OrgService
  ) {}

  ngOnInit(): void {
    this.orgService.currentOrgId$.subscribe(orgId => {
      this.orgId.set(orgId)
      this.getAndFilterBios(orgId)
    })
  }

  getAndFilterBios(orgId: string) {
    this.aboutService.getBios(orgId).subscribe(aboutRes => {
      this.primaryBio.set(aboutRes.find((bio: any) => bio.isPrimary))
      this.bios.set(aboutRes.filter((bio: any) => !bio.isPrimary))
      console.log(this.bios())
      console.log(this.primaryBio())
    })
  }

  addBioClick() {
    this.activeDialogConfig.set(this.createBioDialogConfig())
    this.formDialogOpen.set(true)
  }

  editBioClick(bio: any) {
    console.log('edit', bio)
  }

  deleteBioClick(bio: any) {
    console.log('delete', bio)
  }

  createBio() {
    const bioForm = this.createBioDialogConfig().form
    if (!bioForm.valid) {
      bioForm.markAllAsTouched()
      return
    }
    const data = new FormData()
    data.append('name', bioForm.get('name').value)
    data.append('biography', bioForm.get('biography').value)
    data.append('isPrimary', bioForm.get('isPrimary').value)
    const imageFile = bioForm.get('image')
    data.append('image', imageFile.value, imageFile.name)

    this.aboutService.createBio(this.orgId(), data).subscribe(res => {
      // TODO: add success and error messaging / Also add error messaging for img input
      this.getAndFilterBios(this.orgId())
      this.formDialogOpen.set(false)
    })
  }
}
