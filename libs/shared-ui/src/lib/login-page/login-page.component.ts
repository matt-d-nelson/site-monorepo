import { Component, OnInit } from '@angular/core'
import { ButtonComponent, InputComponent } from '@angular-monorepo/core-ui'
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'shared-ui-login-page',
  standalone: true,
  imports: [ButtonComponent, InputComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  loginUser() {
    console.log('login')
  }

  registerUser() {
    console.log('register')
  }
}
