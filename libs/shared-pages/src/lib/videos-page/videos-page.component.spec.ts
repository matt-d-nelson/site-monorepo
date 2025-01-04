import { ComponentFixture, TestBed } from '@angular/core/testing'

import { VideosPageComponent } from './videos-page.component'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import {
  AboutService,
  AuthService,
  OrgService,
  VideosService,
} from '@angular-monorepo/shared-services'
import { createSpyFromClass } from 'jest-auto-spies'

describe('VideosPageComponent', () => {
  let component: VideosPageComponent
  let fixture: ComponentFixture<VideosPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideosPageComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: VideosService,
          useValue: createSpyFromClass(VideosService),
        },
        {
          provide: OrgService,
          useValue: createSpyFromClass(OrgService, {
            observablePropsToSpyOn: ['currentOrgId$'],
          }),
        },
        { provide: AuthService, useValue: createSpyFromClass(AuthService) },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(VideosPageComponent)
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
