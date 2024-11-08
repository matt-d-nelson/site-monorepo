import { AppContainerComponent } from '@angular-monorepo/shared-ui'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ENV } from '@angular-monorepo/environments'
import { FeedService } from '@angular-monorepo/shared-services'

@Component({
  standalone: true,
  imports: [RouterModule, AppContainerComponent],
  providers: [FeedService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'telestela'
  constructor(private feedService: FeedService) {
    console.log(ENV)
    this.feedService.getFeed().subscribe((res) => {
      console.log(res)
    })
  }
}
