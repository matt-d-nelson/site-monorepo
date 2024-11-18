import { Component, OnInit } from '@angular/core'
import { ButtonComponent } from '@angular-monorepo/core-ui'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { FormDialogComponent } from '../form-dialog/form-dialog.component'
import { AuthService } from '@angular-monorepo/shared-services'

@Component({
  selector: 'shared-ui-login-page',
  standalone: true,
  imports: [ButtonComponent, FormsModule, ReactiveFormsModule, CommonModule, FormDialogComponent],
  providers: [AuthService],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  constructor(private authService: AuthService) {}

  formDialogOpen: boolean = false

  loginDialogConfig = {
    header: 'Login',
    confirmConfig: {
      label: 'Login',
      confirmMethod: () => this.handleLogin(),
    },
    form: new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    }),
    formConfig: [
      {
        label: 'Email',
        control: 'email',
        type: 'text'
      },
      {
        label: 'Password',
        control: 'password',
        type: 'password'
      }
    ]
  }

  loginUser() {
    this.formDialogOpen = true
  }

  registerUser() {
    // swap out config and form
    this.formDialogOpen = true
  }

  handleLogin() {
    console.log('in handle login')
    this.formDialogOpen = false
  }
}
