import { ButtonComponent } from '@angular-monorepo/core-ui'
import { BUTTON_TYPES, CORE_COLORS } from '@angular-monorepo/shared-constants'
import { ConfirmationDialogService } from '@angular-monorepo/shared-services'
import { ConfirmDialogConfig } from '@angular-monorepo/shared-models'
import { CommonModule } from '@angular/common'
import {
  Component,
  ElementRef,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'shared-ui-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
})
export class ConfirmationDialogComponent implements OnInit {
  BUTTON_TYPES = signal(BUTTON_TYPES)
  CORE_COLORS = signal(CORE_COLORS)

  @ViewChild('confirmationDialog', { static: true })
  dialog!: ElementRef<HTMLDialogElement>
  dialogConfig = signal<ConfirmDialogConfig | null>(null)

  constructor(private confirmationDialogService: ConfirmationDialogService) {}

  ngOnInit(): void {
    this.confirmationDialogService.dialogConfig$.subscribe((config: ConfirmDialogConfig | null) => {
      this.dialogConfig.set(config)
    })
    this.confirmationDialogService.dialogOpen$.subscribe((isOpen: boolean) => {
      isOpen
        ? this.dialog.nativeElement.showModal()
        : this.dialog.nativeElement.close()
    })
  }

  handleCancel() {
    this.confirmationDialogService.cancel()
  }

  handleConfirm() {
    this.confirmationDialogService.confirm()
  }
}
