import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { LoginPageComponent } from './login-page.component'
import { AuthService, OrgService } from '@angular-monorepo/shared-services'
import { createSpyFromClass } from 'jest-auto-spies'

describe('LoginPageComponent', () => {
  let component: LoginPageComponent
  let fixture: ComponentFixture<LoginPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: OrgService,
          useValue: createSpyFromClass(OrgService, {
            observablePropsToSpyOn: ['currentOrgId$'],
          }),
        },
        { provide: AuthService, useValue: createSpyFromClass(AuthService) },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(LoginPageComponent)
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
