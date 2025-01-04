import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AlbumsPageComponent } from './albums-page.component'
import {
  AlbumsService,
  AuthService,
  OrgService,
} from '@angular-monorepo/shared-services'
import { createSpyFromClass } from 'jest-auto-spies'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'

describe('AlbumsPageComponent', () => {
  let component: AlbumsPageComponent
  let fixture: ComponentFixture<AlbumsPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumsPageComponent],
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
        { provide: AlbumsService, useValue: createSpyFromClass(AlbumsService) },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(AlbumsPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
