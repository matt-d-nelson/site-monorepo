import { Component } from '@angular/core'
import { ButtonComponent } from '@angular-monorepo/core-ui'

@Component({
  selector: 'shared-ui-login-page',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  loginUser() {
    console.log('login')
  }

  registerUser() {
    console.log('register')
  }
}
