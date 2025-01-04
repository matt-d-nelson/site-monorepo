import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EventsPageComponent } from './events-page.component'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import {
  AuthService,
  EventsService,
  OrgService,
} from '@angular-monorepo/shared-services'
import { createSpyFromClass } from 'jest-auto-spies'

describe('EventsPageComponent', () => {
  let component: EventsPageComponent
  let fixture: ComponentFixture<EventsPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsPageComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: EventsService,
          useValue: createSpyFromClass(EventsService),
        },
        {
          provide: OrgService,
          useValue: createSpyFromClass(OrgService, {
            observablePropsToSpyOn: ['currentOrgId$', 'currentOrgTheme$'],
          }),
        },
        { provide: AuthService, useValue: createSpyFromClass(AuthService) },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(EventsPageComponent)
    component = fixture.componentInstance
    const dialogElement = document.createElement('dialog')
    if (!dialogElement.showModal) {
      HTMLDialogElement.prototype.showModal = function () {
        this.setAttribute('open', '')
      }
      HTMLDialogElement.prototype.close = function () {
        this.removeAttribute('open')
      }
    }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
