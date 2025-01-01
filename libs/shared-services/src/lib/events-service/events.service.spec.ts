import { TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { createSpyFromClass } from 'jest-auto-spies'
import { EventsService } from './events.service'

describe('EventsService', () => {
  let service: EventsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: EventsService, useValue: createSpyFromClass(EventsService) },
      ],
    })
    service = TestBed.inject(EventsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
