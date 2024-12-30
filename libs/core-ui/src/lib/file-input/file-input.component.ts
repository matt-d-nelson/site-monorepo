import { CommonModule } from '@angular/common'
import { Component, input, OnInit, signal } from '@angular/core'
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
export class FileInputComponent implements OnInit {
  BUTTON_TYPES = signal(BUTTON_TYPES)
  fileName = signal('No file selected')
  label = input.required<string>()
  parentForm = input.required<FormGroup>()
  control = input.required<any>()
  loading = input.required<boolean>()
  acceptedFiles = input.required<string[]>()

  ngOnInit(): void {
    this.control().valueChanges.subscribe((value: any) => {
      if (!value) {
        this.fileName.set('No file selected')
      }
    })
  }

  onFileSelected(event: any) {
    const file = event?.target?.files[0]
    if (!file) {
      this.fileName.set('No file selected')
      this.control().setValue(null)
    }

    const fileName = file.name
    const type = fileName.split('.').pop().toLowerCase()
    this.fileName.set(fileName)
    this.control().markAllAsTouched()
    if (this.acceptedFiles().some(ext => ext === type)) {
      this.control().setValue(file)
      this.control().setErrors(null)
      return
    }
    this.control().setValue(null)
    this.control().setErrors({ invalidFileType: true })
  }
}
