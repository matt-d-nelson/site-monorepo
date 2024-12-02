import {
  ButtonComponent,
  ImgInputComponent,
  InputComponent,
  RadioInputComponent,
} from '@angular-monorepo/core-ui'
import { BUTTON_TYPES, CORE_COLORS } from '@angular-monorepo/shared-constants'
import { CommonModule } from '@angular/common'
import {
  Component,
  ElementRef,
  input,
  output,
  ViewChild,
  effect,
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
  @ViewChild('formDialog', { static: true })
  dialog!: ElementRef<HTMLDialogElement>
  open = input(false)
  openChange = output<boolean>()

  dialogConfig = input.required<any>() //TODO: type
  BUTTON_TYPES = BUTTON_TYPES
  CORE_COLORS = CORE_COLORS

  constructor() {
    effect(() => {
      this.updateDialogState()
    })
  }

  openModal() {
    this.dialog.nativeElement.showModal()
  }

  closeModal() {
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
