import { ButtonComponent, LazyImgComponent } from '@angular-monorepo/core-ui'
import { OrgService } from '@angular-monorepo/shared-services'
import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
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

  dropdownVisible: boolean = false
  dropdownConfig!: any
  navColor!: string
  svgColor!: string
  logoImg: string = ''

  ngOnInit(): void {
    this.orgService.currentOrgTheme$.subscribe((orgTheme: any) => {
      this.dropdownConfig = orgTheme.componentColors.nav.config
      this.navColor = orgTheme.componentColors.nav.color
      this.svgColor = orgTheme.componentColors.main.text
      this.logoImg = orgTheme.staticImages.logo
    })
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible
  }

  navigate(nav: string) {
    this.router.navigate([nav])
    this.toggleDropdown()
  }
}
