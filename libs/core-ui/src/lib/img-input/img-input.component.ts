import { BUTTON_TYPES } from '@angular-monorepo/shared-constants'
import { Component, input, OnInit, signal } from '@angular/core'
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper'
import { ButtonComponent } from '../button/button.component'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'

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
export class ImgInputComponent implements OnInit {
  BUTTON_TYPES = signal(BUTTON_TYPES)

  parentForm = input.required<FormGroup>()
  control = input.required<any>()
  roundCropper = input<boolean | undefined>(false)
  aspectRatio = input<'sqr' | 'rect'>('sqr')
  calculatedAR = signal<number>(1 / 1)

  imageChangedEvent = signal<any>('')

  ngOnInit(): void {
    this.control().valueChanges.subscribe((value: any) => {
      if (!value) {
        this.imageChangedEvent.set('')
      }
    })
    this.calculateAR()
  }

  calculateAR() {
    if (this.aspectRatio() === 'sqr') {
      this.calculatedAR.set(1 / 1)
    }
    if (this.aspectRatio() === 'rect') {
      this.calculatedAR.set(4 / 3)
    }
  }

  handleFileChange(event: any) {
    this.imageChangedEvent.set(event)
  }

  handleImageCropped(event: ImageCroppedEvent) {
    if (!event.blob) return
    this.control()?.setValue(event.blob)
  }
}
