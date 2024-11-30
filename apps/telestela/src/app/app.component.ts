import {
  AppContainerComponent,
  BackgroundWaveComponent,
  NavBarComponent,
} from '@angular-monorepo/shared-ui'
import { Component, OnInit, signal } from '@angular/core'
import { AuthService, OrgService } from '@angular-monorepo/shared-services'
import { ORGIDS } from '@angular-monorepo/shared-constants'
import { CommonModule } from '@angular/common'

@Component({
  standalone: true,
  imports: [
    AppContainerComponent,
    BackgroundWaveComponent,
    NavBarComponent,
    CommonModule,
  ],
  providers: [AuthService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'telestela'
  orgId = signal<ORGIDS>(ORGIDS.TELESTELA)
  color = signal<string>('')

  constructor(private orgService: OrgService) {}

  ngOnInit(): void {
    this.orgService.setCurrentOrg(this.orgId())
    this.orgService.currentOrgTheme$.subscribe((orgTheme: any) => {
      this.color.set(orgTheme.componentColors.main.text)
    })
  }
}
