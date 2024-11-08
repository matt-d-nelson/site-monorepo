import { Component } from '@angular/core';
import { HomePageComponent } from '@angular-monorepo/shared-ui'

@Component({
  selector: 'telestela-home',
  standalone: true,
  imports: [HomePageComponent],
  templateUrl: './telestela-home.component.html',
  styleUrl: './telestela-home.component.scss'
})
export class TelestelaHomeComponent {

}
