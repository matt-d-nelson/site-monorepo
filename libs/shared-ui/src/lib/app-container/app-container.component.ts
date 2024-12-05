import { OrgService } from '@angular-monorepo/shared-services'
import { CommonModule } from '@angular/common'
import { Component, ContentChild, TemplateRef } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component'

@Component({
  selector: 'shared-ui-app-container',
  standalone: true,
  imports: [RouterModule, CommonModule, ConfirmationDialogComponent],
  templateUrl: './app-container.component.html',
  styleUrl: './app-container.component.scss',
})
export class AppContainerComponent {
  @ContentChild('background') background!: TemplateRef<any>
  @ContentChild('header') header!: TemplateRef<any>
  @ContentChild('footer') footer!: TemplateRef<any>
}
