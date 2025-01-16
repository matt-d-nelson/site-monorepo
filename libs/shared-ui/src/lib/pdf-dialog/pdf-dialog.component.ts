import { ButtonComponent } from '@angular-monorepo/core-ui'
import { BUTTON_TYPES, CORE_COLORS } from '@angular-monorepo/shared-constants'
import { CommonModule } from '@angular/common'
import {
  Component,
  effect,
  ElementRef,
  input,
  output,
  signal,
  ViewChild,
} from '@angular/core'
import { PdfViewerModule } from 'ng2-pdf-viewer'

@Component({
  selector: 'shared-ui-pdf-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent, PdfViewerModule],
  templateUrl: './pdf-dialog.component.html',
  styleUrl: './pdf-dialog.component.scss',
})
export class PdfDialogComponent {
  BUTTON_TYPES = signal(BUTTON_TYPES)
  CORE_COLORS = signal(CORE_COLORS)

  @ViewChild('pdfDialog', { static: true })
  dialog!: ElementRef<HTMLDialogElement>
  open = input(false)
  openChange = output<boolean>()

  config = input.required<any>()

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

  async downloadPdf() {
    const response = await fetch(this.config().url)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = this.config().fileName
    link.click()
    window.URL.revokeObjectURL(url)
  }
}
