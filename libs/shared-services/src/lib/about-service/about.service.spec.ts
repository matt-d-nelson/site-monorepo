import { TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { createSpyFromClass } from 'jest-auto-spies'
import { AboutService } from './about.service'

describe('AboutService', () => {
  let service: AboutService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AboutService, useValue: createSpyFromClass(AboutService) },
      ],
    })
    service = TestBed.inject(AboutService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
