import { ButtonComponent, LazyImgComponent } from '@angular-monorepo/core-ui'
import { BUTTON_TYPES, CORE_COLORS } from '@angular-monorepo/shared-constants'
import {
  AuthService,
  ConfirmationDialogService,
  OrgService,
  ToastService,
} from '@angular-monorepo/shared-services'
import {
  FormDialogComponent,
  PageWrapperComponent,
} from '@angular-monorepo/shared-ui'
import { CommonModule } from '@angular/common'
import { Component, OnInit, signal } from '@angular/core'
import { NgScrollbarModule } from 'ngx-scrollbar'

@Component({
  selector: 'shared-pages-code-page',
  standalone: true,
  imports: [
    CommonModule,
    FormDialogComponent,
    ButtonComponent,
    LazyImgComponent,
    NgScrollbarModule,
    PageWrapperComponent,
  ],
  templateUrl: './code-page.component.html',
  styleUrl: './code-page.component.scss',
})
export class CodePageComponent implements OnInit {
  constructor(
    private orgService: OrgService,
    private confirmationDialogService: ConfirmationDialogService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  BUTTON_TYPES = signal(BUTTON_TYPES)
  CORE_COLORS = signal(CORE_COLORS)
  orgId = signal<string>('')
  userIsAdmin = signal<boolean>(false)

  ngOnInit(): void {
    this.orgService.currentOrgId$.subscribe(orgId => {
      this.orgId.set(orgId)
      this.userIsAdmin.set(this.authService.isUserAdmin(orgId))
    })
  }

  addCodeClick() {
    console.log('hey bitch')
  }
}
