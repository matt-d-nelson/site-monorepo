import { LazyImgComponent } from '@angular-monorepo/core-ui'
import { OrgService } from '@angular-monorepo/shared-services'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'shared-ui-home-page',
  standalone: true,
  imports: [LazyImgComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  constructor(private orgService: OrgService) {}

  homeImg!: string

  ngOnInit(): void {
    this.orgService.currentOrgTheme$.subscribe((orgTheme: any) => {
      this.homeImg = orgTheme.staticImages.homePage
    })
  }
}
