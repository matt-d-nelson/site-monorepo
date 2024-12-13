import { ToastMessage } from '@angular-monorepo/shared-models'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _toast = new BehaviorSubject<ToastMessage | null>(null)
  toast$ = this._toast.asObservable()

  constructor() {}

  showToast(toast: ToastMessage) {
    this._toast.next(toast)
  }
}
