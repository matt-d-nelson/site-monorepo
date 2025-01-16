import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { createSpyFromClass } from 'jest-auto-spies'
import { AboutPageComponent } from './about-page.component'
import {
  AboutService,
  AuthService,
  ConfirmationDialogService,
  OrgService,
  ToastService,
} from '@angular-monorepo/shared-services'
import { FormDialogComponent } from '@angular-monorepo/shared-ui'

describe('AboutPageComponent', () => {
  let component: AboutPageComponent
  let fixture: ComponentFixture<AboutPageComponent>
  let orgService: jest.Mocked<OrgService>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutPageComponent, FormDialogComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: AboutService,
          useValue: createSpyFromClass(AboutService, {
            observablePropsToSpyOn: ['bios$'],
          }),
        },
        {
          provide: OrgService,
          useValue: createSpyFromClass(OrgService, {
            observablePropsToSpyOn: ['currentOrgId$', 'currentOrgTheme$'],
          }),
        },
        { provide: AuthService, useValue: createSpyFromClass(AuthService) },
        {
          provide: ConfirmationDialogService,
          useValue: createSpyFromClass(ConfirmationDialogService),
        },
        { provide: ToastService, useValue: createSpyFromClass(ToastService) },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(AboutPageComponent)
    component = fixture.componentInstance
    orgService = TestBed.inject(OrgService) as jest.Mocked<OrgService>
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
