import { Component, signal } from '@angular/core'
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper'

@Component({
  selector: 'core-ui-img-input',
  standalone: true,
  imports: [ImageCropperComponent],
  templateUrl: './img-input.component.html',
  styleUrl: './img-input.component.scss',
})
export class ImgInputComponent {
  imageChangedEvent = signal<any>('')
  croppedImage = signal<string>('')

  handleFileChange(event: any) {
    this.imageChangedEvent.set(event)
  }

  handleImageCropped(event: ImageCroppedEvent) {
    this.croppedImage.set(event.base64 || '')
  }

  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1])
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }

    return new Blob([ab], { type: mimeString })
  }
}
