import { Component, OnInit } from '@angular/core';
import { HomePageComponent } from '@angular-monorepo/shared-ui'
import { OrgService } from '@angular-monorepo/shared-services';

@Component({
  selector: 'telestela-home',
  standalone: true,
  imports: [HomePageComponent],
  templateUrl: './telestela-home.component.html',
  styleUrl: './telestela-home.component.scss'
})
export class TelestelaHomeComponent implements OnInit{
  constructor(private orgService: OrgService) {}
  homeImg: string = ''

  ngOnInit(): void {
    this.orgService.currentOrgTheme$.subscribe((orgTheme: any) => {
      this.homeImg = orgTheme.staticImages.homePage
    })
  }
}
