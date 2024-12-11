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
  activeToast = signal<ToastMessage | null>(null)
  entering = signal<boolean>(false)
  leaving = signal<boolean>(false)

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toast$.subscribe((toastMessage: ToastMessage | null) => {
      this.activeToast.set(toastMessage)
      this.entering.set(true)
      this.leaving.set(false)

      setTimeout(() => {
        this.entering.set(false), this.leaving.set(true)
      }, 9000)
    })
  }
}
