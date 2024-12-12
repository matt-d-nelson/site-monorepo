import { BUTTON_TYPES, CORE_COLORS } from '@angular-monorepo/shared-constants';
import { AuthService, ConfirmationDialogService, EventsService, OrgService, ToastService } from '@angular-monorepo/shared-services';
import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { ButtonComponent, LazyImgComponent } from '@angular-monorepo/core-ui';
import { CreateEventDialogConfig } from './events-page.config';

@Component({
  selector: 'shared-ui-events-page',
  standalone: true,
  imports: [
    CommonModule,
    FormDialogComponent,
    ButtonComponent,
    LazyImgComponent
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

  upcomingEvents = signal<any>([]) //TODO: type
  pastEvents = signal<any>([])
  sectionsConfig = computed(() => [
    {
      title: 'Upcoming',
      events: this.upcomingEvents
    },
    {
      title: 'Past',
      events: this.pastEvents
    }
  ])

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
      const today = new Date().setHours(0,0,0,0)
      const pastTemp: any = []
      const upcomingTemp: any = []

      events.forEach((event: any) => {
        const eventDate = new Date(event.date).setHours(0,0,0,0)
        if(eventDate < today) {
          pastTemp.push(event)
        } else {
          upcomingTemp.push(event)
        }
      })
      this.pastEvents.set(pastTemp)
      this.upcomingEvents.set(upcomingTemp)
    })
  }

  addEventClick() {
    this.activeDialogConfig.set(this.createEventDialogConfig())
    this.formDialogOpen.set(true)
  }

  createEvent() {
    const eventForm = this.createEventDialogConfig().form
    console.log(eventForm.value)
    this.eventsService.createEvent(this.orgId(), eventForm.value).subscribe((res) => {
      this.eventsService.getEvents(this.orgId())
    })
  }
}
