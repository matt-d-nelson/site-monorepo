import { CommonModule } from '@angular/common'
import {
  Component,
  ContentChild,
  OnInit,
  signal,
  TemplateRef,
} from '@angular/core'
import { RouterModule } from '@angular/router'
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component'
import { ToastComponent } from '../toast/toast.component'
import { NgxSpinnerModule } from 'ngx-spinner'
import { OrgService } from '@angular-monorepo/shared-services'

@Component({
  selector: 'shared-ui-app-container',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ConfirmationDialogComponent,
    ToastComponent,
    NgxSpinnerModule,
  ],
  templateUrl: './app-container.component.html',
  styleUrl: './app-container.component.scss',
})
export class AppContainerComponent implements OnInit {
  spinnerTheme = signal<any>({
    type: 'ball-scale-multiple',
  })

  constructor(private orgService: OrgService) {}

  ngOnInit(): void {
    this.orgService.currentOrgTheme$.subscribe((orgTheme: any) => {
      this.spinnerTheme.set({
        ...this.spinnerTheme(),
        color: orgTheme.componentColors.core.primary,
      })
    })
  }

  @ContentChild('background') background!: TemplateRef<any>
  @ContentChild('header') header!: TemplateRef<any>
  @ContentChild('footer') footer!: TemplateRef<any>
}
