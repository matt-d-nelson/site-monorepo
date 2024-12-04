import { ButtonComponent, ImgInputComponent } from '@angular-monorepo/core-ui'
import { Component, OnInit, signal } from '@angular/core'
import { FormDialogComponent } from '../form-dialog/form-dialog.component'
import { CreateAboutDialogConfig } from './about-page.config'
import { BUTTON_TYPES } from '@angular-monorepo/shared-constants'
import { AboutService, OrgService } from '@angular-monorepo/shared-services'

@Component({
  selector: 'shared-ui-about-page',
  standalone: true,
  imports: [ImgInputComponent, FormDialogComponent, ButtonComponent],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
})
export class AboutPageComponent implements OnInit {
  BUTTON_TYPES = signal(BUTTON_TYPES)
  orgId = signal<string>('')

  formDialogOpen = signal<boolean>(false)
  createBioDialogConfig = signal<any>(CreateAboutDialogConfig(this))
  activeDialogConfig = signal<any>(this.createBioDialogConfig())

  constructor(
    private aboutService: AboutService,
    private orgService: OrgService
  ) {}

  ngOnInit(): void {
    this.orgService.currentOrgId$.subscribe(orgId => {
      this.orgId.set(orgId)
    })
  }

  addBioClick() {
    this.activeDialogConfig.set(this.createBioDialogConfig())
    this.formDialogOpen.set(true)
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
      this.formDialogOpen.set(false)
    })
  }
}
