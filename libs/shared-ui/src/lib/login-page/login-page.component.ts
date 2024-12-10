import { Component, signal } from '@angular/core'
import { ButtonComponent } from '@angular-monorepo/core-ui'
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

@Component({
  selector: 'shared-ui-login-page',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormDialogComponent,
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
    this.formDialogOpen.set(false)
    this.authService.loginUser(loginForm.value).subscribe({
      next: () => {
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
    this.formDialogOpen.set(false)
    this.authService.registerUser(registerForm.value).subscribe({
      next: () => {
        this.toastService.showToast(successMsg)
      },
      error: () => {
        this.toastService.showToast(errorMsg)
      },
    })
  }
}
