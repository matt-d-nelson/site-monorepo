import { ButtonComponent, LazyImgComponent } from '@angular-monorepo/core-ui'
import { OrgService } from '@angular-monorepo/shared-services'
import { CommonModule } from '@angular/common'
import { Component, OnInit, signal } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'shared-ui-nav-bar',
  standalone: true,
  imports: [ButtonComponent, LazyImgComponent, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  constructor(private orgService: OrgService, private router: Router) {}

  dropdownVisible = signal<boolean>(false)
  dropdownConfig = signal<any>({})
  navColor = signal<string>('')
  svgColor = signal<string>('')
  logoImg = signal<string>('')

  ngOnInit(): void {
    this.orgService.currentOrgTheme$.subscribe((orgTheme: any) => {
      this.dropdownConfig.set(orgTheme.componentColors.nav.config)
      this.navColor.set(orgTheme.componentColors.nav.color)
      this.svgColor.set(orgTheme.componentColors.nav.svgColor)
      this.logoImg.set(orgTheme.staticImages.logo)
    })
  }

  toggleDropdown() {
    this.dropdownVisible.set(!this.dropdownVisible())
  }

  navigate(link: any) {
    if (link?.nav) {
      this.router.navigate([link.nav])
    }
    if (link?.externalNav) {
      window.open(link.externalNav, '_blank')
    }
    this.toggleDropdown()
  }
}
