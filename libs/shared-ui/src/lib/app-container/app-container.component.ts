import { CommonModule } from '@angular/common';
import { Component, ContentChild, TemplateRef } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'shared-ui-app-container',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app-container.component.html',
  styleUrl: './app-container.component.scss'
})
export class AppContainerComponent {
  @ContentChild('backgroundTemplate') backgroundTemplate!: TemplateRef<any>;
  @ContentChild('headerTemplate') headerTemplate!: TemplateRef<any>;
  @ContentChild('footerTemplate') footerTemplate!: TemplateRef<any>;
}
