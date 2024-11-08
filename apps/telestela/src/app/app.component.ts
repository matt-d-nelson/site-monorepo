import { AppContainerComponent } from '@angular-monorepo/shared'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ENV } from '@angular-monorepo/environments'

@Component({
  standalone: true,
  imports: [RouterModule, AppContainerComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'telestela'
  constructor() {
    console.log(ENV)
  }
}
