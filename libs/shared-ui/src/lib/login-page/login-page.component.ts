import { Component, signal } from '@angular/core'
import {
  ButtonComponent,
  PageWrapperComponent,
} from '@angular-monorepo/core-ui'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { FormDialogComponent } from '../form-dialog/form-dialog.component'
import { AuthService, ToastService } from '@angular-monorepo/shared-services'
import {
  CreateLoginDialogConfig,
  CreateRegisterDialogConfig,
} from './login-page.config'
import { BUTTON_TYPES, CORE_COLORS } from '@angular-monorepo/shared-constants'
import { ToastMessage } from '@angular-monorepo/shared-models'
import { finalize } from 'rxjs'

@Component({
  selector: 'shared-ui-login-page',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormDialogComponent,
    PageWrapperComponent,
  ],
  providers: [AuthService],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  BUTTON_TYPES = signal(BUTTON_TYPES)
  CORE_COLORS = signal(CORE_COLORS)

  formDialogOpen = signal<boolean>(false)
  loginDialogConfig = signal<any>(CreateLoginDialogConfig(this)) //TODO: type
  registerDialogConfig = signal<any>(CreateRegisterDialogConfig(this))
  activeDialogConfig = signal<any>(this.loginDialogConfig())

  dialogLoading = signal<boolean>(false)

  constructor(
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  loginUser() {
    this.activeDialogConfig.set(this.loginDialogConfig())
    this.formDialogOpen.set(true)
  }

  registerUser() {
    this.activeDialogConfig.set(this.registerDialogConfig())
    this.formDialogOpen.set(true)
  }

  handleLogin() {
    const loginForm = this.loginDialogConfig().form
    if (!loginForm.valid) {
      loginForm.markAllAsTouched()
      return
    }

    const successMsg: ToastMessage = {
      type: 'success',
      message: 'Login successfull',
    }
    const errorMsg: ToastMessage = {
      type: 'error',
      message: 'Login failed',
    }
    this.dialogLoading.set(true)
    this.authService
      .loginUser(loginForm.value)
      .pipe(finalize(() => this.dialogLoading.set(false)))
      .subscribe({
        next: () => {
          this.formDialogOpen.set(false)
          this.toastService.showToast(successMsg)
        },
        error: () => {
          this.toastService.showToast(errorMsg)
        },
      })
  }

  handleRegister() {
    const registerForm = this.registerDialogConfig().form
    if (!registerForm.valid) {
      registerForm.markAllAsTouched()
      return
    }

    const successMsg: ToastMessage = {
      type: 'success',
      message: 'Account has been registered',
    }
    const errorMsg: ToastMessage = {
      type: 'error',
      message: 'Account registration failed',
    }
    this.dialogLoading.set(true)
    this.authService
      .registerUser(registerForm.value)
      .pipe(finalize(() => this.dialogLoading.set(false)))
      .subscribe({
        next: () => {
          this.formDialogOpen.set(false)
          this.toastService.showToast(successMsg)
        },
        error: () => {
          this.toastService.showToast(errorMsg)
        },
      })
  }
}
