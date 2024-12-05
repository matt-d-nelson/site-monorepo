import {
  ButtonComponent,
  ImgInputComponent,
  InputComponent,
  RadioInputComponent,
} from '@angular-monorepo/core-ui'
import { BUTTON_TYPES, CORE_COLORS } from '@angular-monorepo/shared-constants'
import { FORM_DIALOG_INPUT_TYPES, FormDialogConfig } from '@angular-monorepo/shared-models'
import { CommonModule } from '@angular/common'
import {
  Component,
  ElementRef,
  input,
  output,
  ViewChild,
  effect,
  signal,
} from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'shared-ui-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputComponent,
    FormsModule,
    ReactiveFormsModule,
    ImgInputComponent,
    RadioInputComponent,
  ],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.scss',
})
export class FormDialogComponent {
  BUTTON_TYPES = signal(BUTTON_TYPES)
  CORE_COLORS = signal(CORE_COLORS)
  INPUT_TYPES = signal(FORM_DIALOG_INPUT_TYPES)

  @ViewChild('formDialog', { static: true })
  dialog!: ElementRef<HTMLDialogElement>
  open = input(false)
  openChange = output<boolean>()

  dialogConfig = input.required<FormDialogConfig>()

  constructor() {
    effect(() => {
      this.updateDialogState()
    })
  }

  openModal() {
    this.dialog.nativeElement.showModal()
  }

  closeModal() {
    this.dialogConfig().form.reset()
    this.dialog.nativeElement.close()
    this.openChange.emit(false)
  }

  updateDialogState() {
    this.open() ? this.openModal() : this.closeModal()
  }

  handleConfirm() {
    this.dialogConfig().confirmConfig.confirmMethod()
  }
}
