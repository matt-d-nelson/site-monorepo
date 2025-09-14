import { LazyImgComponent } from '@angular-monorepo/core-ui'
import { OrgService, TriviaService } from '@angular-monorepo/shared-services'
import { PageWrapperComponent } from '@angular-monorepo/shared-ui'
import { CommonModule } from '@angular/common'
import { Component, OnInit, signal } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NgScrollbar } from 'ngx-scrollbar'
import { NgxSpinnerService } from 'ngx-spinner'
import { delay } from 'rxjs'

@Component({
  selector: 'page-trivia-leaderboards-page',
  standalone: true,
  imports: [CommonModule, PageWrapperComponent, NgScrollbar, LazyImgComponent],
  templateUrl: './trivia-leaderboards-page.component.html',
  styleUrl: './trivia-leaderboards-page.component.scss',
})
export class TriviaLeaderboardsPageComponent implements OnInit {
  triviaId = signal<string>('')
  leaderboardData = signal<any>({})
  bannerImg = signal('')

  constructor(
    private route: ActivatedRoute,
    private triviaService: TriviaService,
    private spinnerService: NgxSpinnerService,
    private orgService: OrgService
  ) {}

  ngOnInit(): void {
    this.spinnerService.show()
    this.triviaId.set(this.route.snapshot.paramMap.get('id')!)
    this.triviaService.getTriviaLeaderboards(this.triviaId()).subscribe({
      next: res => {
        this.spinnerService.hide()
        console.log(res)
        this.leaderboardData.set(res)
      },
      error: () => {
        this.spinnerService.hide()
      },
    })
    this.orgService.currentOrgTheme$.subscribe((orgTheme: any) => {
      this.bannerImg.set(orgTheme.staticResouces.triviaPage)
    })
  }
}
