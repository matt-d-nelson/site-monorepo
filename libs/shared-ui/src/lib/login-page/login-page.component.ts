import { Component, OnInit, signal } from '@angular/core'
import { ButtonComponent } from '@angular-monorepo/core-ui'
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { CommonModule } from '@angular/common'
import { FormDialogComponent } from '../form-dialog/form-dialog.component'
import { AuthService } from '@angular-monorepo/shared-services'
import {
  CreateLoginDialogConfig,
  CreateRegisterDialogConfig,
} from './login-page.config'

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
  formDialogOpen = signal<boolean>(false)
  loginDialogConfig = signal<any>(CreateLoginDialogConfig(this)) //TODO: type
  registerDialogConfig = signal<any>(CreateRegisterDialogConfig(this))
  activeDialogConfig = signal<any>(this.loginDialogConfig())

  constructor(private authService: AuthService) {}

  loginUser() {
    this.activeDialogConfig = this.loginDialogConfig
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
    const loginUserReqBody = {
      email: loginForm.value.email,
      password: loginForm.value.password,
    }
    this.authService.loginUser(loginUserReqBody).subscribe(() => {
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
    const registerUserReqBody = {
      email: registerForm.value.email,
      password: registerForm.value.password,
    }
    this.authService.registerUser(registerUserReqBody).subscribe(() => {
      //TODO: Alert Success / error handling
      this.formDialogOpen.set(false)
    })
  }
}
