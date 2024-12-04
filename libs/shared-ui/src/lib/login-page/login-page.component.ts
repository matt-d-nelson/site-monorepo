import { Component, signal } from '@angular/core'
import { ButtonComponent } from '@angular-monorepo/core-ui'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { FormDialogComponent } from '../form-dialog/form-dialog.component'
import { AuthService } from '@angular-monorepo/shared-services'
import {
  CreateLoginDialogConfig,
  CreateRegisterDialogConfig,
} from './login-page.config'
import { BUTTON_TYPES, CORE_COLORS } from '@angular-monorepo/shared-constants'

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

  constructor(private authService: AuthService) {}

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
    this.authService.loginUser(loginForm.value).subscribe(() => {
      //TODO: Alert Success / error handling
      this.formDialogOpen.set(false)
    })
  }

  handleRegister() {
    const registerForm = this.registerDialogConfig().form
    if (!registerForm.valid) {
      registerForm.markAllAsTouched()
      return
    }
    this.authService.registerUser(registerForm.value).subscribe(() => {
      //TODO: Alert Success / error handling
      this.formDialogOpen.set(false)
    })
  }
}
