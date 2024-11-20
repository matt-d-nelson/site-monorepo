import { AppContainerComponent, BackgroundWaveComponent } from '@angular-monorepo/shared-ui'
import { Component, OnInit } from '@angular/core'
import { AuthService, OrgService } from '@angular-monorepo/shared-services'
import { ORGIDS } from '@angular-monorepo/shared-constants'

@Component({
  standalone: true,
  imports: [AppContainerComponent, BackgroundWaveComponent],
  providers: [AuthService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'telestela'
  orgId = ORGIDS.TELESTELA

  constructor(private orgService: OrgService) {}

  ngOnInit(): void {
      this.orgService.setCurrentOrg(this.orgId)
  }
}
