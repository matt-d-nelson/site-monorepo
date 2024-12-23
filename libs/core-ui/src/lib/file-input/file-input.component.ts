import { CommonModule } from '@angular/common'
import { Component, input, signal } from '@angular/core'
import {
  ControlContainer,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms'
import { ButtonComponent } from '../button/button.component'
import { BUTTON_TYPES } from '@angular-monorepo/shared-constants'

@Component({
  selector: 'core-ui-file-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ButtonComponent],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.scss',
})
export class FileInputComponent {
  BUTTON_TYPES = signal(BUTTON_TYPES)
  fileName = signal('No file selected')
  label = input.required<string>()
  parentForm = input.required<FormGroup>()
  control = input.required<any>()
  loading = input.required<boolean>()
  acceptedFiles = input.required<string[]>()

  onFileSelected(event: any) {
    const fileName = event?.target?.files[0]?.name
    if (!fileName) {
      this.fileName.set('No file selected')
    }

    const type = fileName.split('.').pop().toLowerCase()
    this.fileName.set(fileName)
    this.control().markAllAsTouched()
    if (this.acceptedFiles().some(ext => ext === type)) {
      this.control().setErrors(null)
      return
    }
    this.control().setErrors({ invalidFileType: true })
  }
}
