import { AppContainerComponent } from '@angular-monorepo/shared-ui'
import { Component, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AuthService } from '@angular-monorepo/shared-services'

@Component({
  standalone: true,
  imports: [RouterModule, AppContainerComponent],
  providers: [AuthService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'telestela'
  orgId = '12356'

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
      this.authService.setCurrentOrg(this.orgId)
  }
}
