import { ToastMessage } from '@angular-monorepo/shared-models'
import { ToastService } from '@angular-monorepo/shared-services'
import { Component, OnInit, signal } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'core-ui-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent implements OnInit {
  constructor(private toastService: ToastService) {}

  private timeoutId: ReturnType<typeof setTimeout> | null = null
  activeToast = signal<ToastMessage | null>(null)
  entering = signal<boolean>(false)
  leaving = signal<boolean>(false)

  ngOnInit(): void {
    this.toastService.toast$.subscribe((toastMessage: ToastMessage | null) => {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
      }

      this.activeToast.set(toastMessage)
      this.entering.set(true)
      this.leaving.set(false)

      this.timeoutId = setTimeout(() => {
        this.entering.set(false), this.leaving.set(true)
      }, 9000)
    })
  }
}
