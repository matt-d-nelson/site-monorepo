import { ButtonComponent, InputComponent } from '@angular-monorepo/core-ui'
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
