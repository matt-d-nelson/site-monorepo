import {
  AppContainerComponent,
  AudioFooterComponent,
  BackgroundWaveComponent,
  NavBarComponent,
} from '@angular-monorepo/shared-ui'
import { Component, OnInit, signal } from '@angular/core'
import { OrgService } from '@angular-monorepo/shared-services'
import { ORGIDS } from '@angular-monorepo/shared-constants'
import { CommonModule } from '@angular/common'
import { HexToRGB } from '@angular-monorepo/shared-utilities'

@Component({
  standalone: true,
  imports: [
    AppContainerComponent,
    BackgroundWaveComponent,
    NavBarComponent,
    AudioFooterComponent,
    CommonModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'matt-dav-nelson'
  orgId = signal<ORGIDS>(ORGIDS.MATT)

  constructor(private orgService: OrgService) {}

  ngOnInit(): void {
    this.orgService.setCurrentOrg(this.orgId())
    this.orgService.currentOrgTheme$.subscribe((orgTheme: any) => {
      this.registerGlobalStyles(orgTheme.componentColors.core)
    })
  }

  registerGlobalStyles(colors: any) {
    Object.keys(colors).forEach(key => {
      const rgb = HexToRGB(colors[key])
      document.documentElement.style.setProperty(
        `--${key.toLowerCase()}`,
        `${rgb.r}, ${rgb.g}, ${rgb.b}`
      )
    })
  }
}
