import { Injectable } from '@angular/core'
import { BehaviorSubject, filter, Subject, take } from 'rxjs'
import { ConfirmDialogConfig } from '@angular-monorepo/shared-models'

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  constructor() {}

  private _dialogConfig = new BehaviorSubject<ConfirmDialogConfig | null>(null)
  dialogConfig$ = this._dialogConfig.asObservable()

  private _dialogOpen = new BehaviorSubject<boolean>(false)
  dialogOpen$ = this._dialogOpen.asObservable()

  private _dialogResponse = new Subject<boolean>()
  dialogResponse$ = this._dialogResponse.asObservable()

  openDialog(config: ConfirmDialogConfig) {
    this._dialogConfig.next({
      ...config,
      confirmText: config.confirmText || 'Confirm',
      cancelText: config.cancelText || 'Cancel',
    })

    this._dialogOpen.next(true)

    return this.dialogResponse$.pipe(
      take(1),
      filter(res => res !== null)
    )
  }

  confirm() {
    this._dialogResponse.next(true)
    this._dialogConfig.next(null)
    this._dialogOpen.next(false)
  }

  cancel() {
    this._dialogResponse.next(false)
    this._dialogConfig.next(null)
    this._dialogOpen.next(false)
  }
}
