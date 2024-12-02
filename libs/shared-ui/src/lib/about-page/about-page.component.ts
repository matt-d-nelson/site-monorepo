import { ButtonComponent, ImgInputComponent } from '@angular-monorepo/core-ui'
import { Component, signal } from '@angular/core'
import { FormDialogComponent } from '../form-dialog/form-dialog.component'
import { CreateAboutDialogConfig } from './about-page.config'
import { BUTTON_TYPES } from '@angular-monorepo/shared-constants'

@Component({
  selector: 'shared-ui-about-page',
  standalone: true,
  imports: [ImgInputComponent, FormDialogComponent, ButtonComponent],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
})
export class AboutPageComponent {
  BUTTON_TYPES = signal(BUTTON_TYPES)

  formDialogOpen = signal<boolean>(false)
  createBioDialogConfig = signal<any>(CreateAboutDialogConfig(this))
  activeDialogConfig = signal<any>(this.createBioDialogConfig())

  addBioClick() {
    this.activeDialogConfig.set(this.createBioDialogConfig())
    this.formDialogOpen.set(true)
  }

  createBio() {
    console.log(this.activeDialogConfig().form.value)
  }
}
