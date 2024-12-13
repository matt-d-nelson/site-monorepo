import { BUTTON_TYPES, CORE_COLORS } from '@angular-monorepo/shared-constants';
import { AuthService, ConfirmationDialogService, EventsService, OrgService, ToastService } from '@angular-monorepo/shared-services';
import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { ButtonComponent, LazyImgComponent } from '@angular-monorepo/core-ui';
import { CreateEventDialogConfig, UpdateEventDialogConfig } from './events-page.config';
import { ToastMessage } from '@angular-monorepo/shared-models';
import { finalize } from 'rxjs';
import { GetObjectDifference } from '@angular-monorepo/shared-utilities';
import { isEmpty } from 'lodash';

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
  updateEventDialogConfig = signal<any>(UpdateEventDialogConfig(this))
  activeDialogConfig = signal<any>(this.createEventDialogConfig())
  previousEventValue =  signal<any>(null)

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

  editEventClick(event:any) {
    console.log(event)
    this.activeDialogConfig.set(this.updateEventDialogConfig())
    this.activeDialogConfig().form.patchValue(event)
    this.previousEventValue.set(event)
    this.formDialogOpen.set(true)

  }

  deleteEventClick(event:any) {
    console.log(event)
    const successMsg: ToastMessage = {
      type: 'success',
      message: `${event.name} was deleted`,
    }
    const errorMsg: ToastMessage = {
      type: 'error',
      message: `Error deleting bio`,
    }

    this.confirmationDialogService.openDialog({
      title: 'Delete Event',
      message: `Are you sure you want to delete ${event.name}?`,
      confirmText: 'Delete',
    }).subscribe((confirmed: boolean) => {
      if (!confirmed) return
      this.eventsService.deleteEvent(this.orgId(), event.id).subscribe({
        next: () => {
          this.toastService.showToast(successMsg)
          this.eventsService.getEvents(this.orgId())
        },
        error: () => {
          this.toastService.showToast(errorMsg)
        }
      })
    })
  }

  createEvent() {
    const eventForm = this.createEventDialogConfig().form
    if(!eventForm.valid) {
      eventForm.markAllAsTouched()
      return
    }
    const successMsg: ToastMessage = {
      type: 'success',
      message: `The ${eventForm.get('name').value} event was created`,
    }
    const errorMsg: ToastMessage = {
      type: 'error',
      message: `Error creating event`,
    }
    this.dialogLoading.set(true)
    this.eventsService.createEvent(this.orgId(), eventForm.value)
    .pipe(finalize(() => this.dialogLoading.set(false))).subscribe({
      next: () => {
        this.toastService.showToast(successMsg)
        this.eventsService.getEvents(this.orgId())
        this.formDialogOpen.set(false)
      },
      error: () => {
        this.toastService.showToast(errorMsg)
      },
    })
  }

  updateEvent() {
    const eventUpdateForm = this.updateEventDialogConfig().form
    if(!eventUpdateForm.valid) {
      eventUpdateForm.markAllAsTouched()
      return
    }

    const eventDif = GetObjectDifference(this.previousEventValue(), eventUpdateForm.value)
    if(isEmpty(eventDif)) {
      this.toastService.showToast({
        type: 'error',
        message: 'No updates detected',
      })
      return
    }

    const successMsg: ToastMessage = {
      type: 'success',
      message: `${eventUpdateForm.get('name').value} was updated`,
    }
    const errorMsg: ToastMessage = {
      type: 'error',
      message: `Error updating event`,
    }
    this.dialogLoading.set(true)
    this.eventsService.updateEvent(this.orgId(), eventUpdateForm.get('id').value, eventDif).pipe(finalize(() => this.dialogLoading.set(false))).subscribe({
      next: () => {
        this.toastService.showToast(successMsg)
        this.eventsService.getEvents(this.orgId())
        this.formDialogOpen.set(false)
      },
      error: () => {
        this.toastService.showToast(errorMsg)
      },
    })
  }

}
