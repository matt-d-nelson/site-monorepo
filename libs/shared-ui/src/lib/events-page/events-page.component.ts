import { BUTTON_TYPES, CORE_COLORS } from '@angular-monorepo/shared-constants';
import { AuthService, ConfirmationDialogService, EventsService, OrgService, ToastService } from '@angular-monorepo/shared-services';
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { ButtonComponent } from '@angular-monorepo/core-ui';
import { CreateEventDialogConfig } from './events-page.config';

@Component({
  selector: 'shared-ui-events-page',
  standalone: true,
  imports: [
    CommonModule,
    FormDialogComponent,
    ButtonComponent
  ],
  templateUrl: './events-page.component.html',
  styleUrl: './events-page.component.scss'
})
export class EventsPageComponent implements OnInit{
  constructor(
    private eventsService: EventsService,
    private orgService: OrgService,
    private confirmationDialogService: ConfirmationDialogService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  BUTTON_TYPES = signal(BUTTON_TYPES)
  CORE_COLORS = signal(CORE_COLORS)
  orgId = signal<string>('')
  userIsAdmin = signal<boolean>(false)

  formDialogOpen = signal<boolean>(false)
  dialogLoading = signal<boolean>(false)
  createEventDialogConfig = signal<any>(CreateEventDialogConfig(this))
  activeDialogConfig = signal<any>(this.createEventDialogConfig())

  ngOnInit(): void {
    this.orgService.currentOrgId$.subscribe(orgId => {
      this.orgId.set(orgId)
      this.userIsAdmin.set(this.authService.isUserAdmin(orgId))
      this.getAndSortEvents(orgId)
    })
  }

  getAndSortEvents(orgId: string) {
    this.eventsService.getEvents(orgId)
    this.eventsService.events$.subscribe(events => {
      console.log(events)
    })
  }

  addEventClick() {
    this.activeDialogConfig.set(this.createEventDialogConfig())
    this.formDialogOpen.set(true)
  }

  createEvent() {
    const eventForm = this.createEventDialogConfig().form
    console.log(eventForm.value)
  }
}
