import { BUTTON_TYPES } from '@angular-monorepo/shared-constants'
import { Component, input, OnInit, signal } from '@angular/core'
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper'
import { ButtonComponent } from '../button/button.component'
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms'

@Component({
  selector: 'core-ui-img-input',
  standalone: true,
  imports: [
    ImageCropperComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './img-input.component.html',
  styleUrl: './img-input.component.scss',
})
export class ImgInputComponent {
  BUTTON_TYPES = signal(BUTTON_TYPES)

  parentForm = input.required<FormGroup>()
  control = input.required<FormControl>()

  imageChangedEvent = signal<any>('')

  handleFileChange(event: any) {
    this.imageChangedEvent.set(event)
  }

  handleImageCropped(event: ImageCroppedEvent) {
    if (!event.blob) return
    this.control()?.setValue(event.blob)
  }
}
