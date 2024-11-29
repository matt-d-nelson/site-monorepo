import { Component } from '@angular/core'

@Component({
  selector: 'shared-ui-about-page',
  standalone: true,
  imports: [],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
})
export class AboutPageComponent {
  aboutData = [
    {
      orgId: '12356',
      name: 'Telestela',
      description: 'Lorum Ipsum you know la de dah',
      primary: true,
      image: '',
    },
  ]
}
