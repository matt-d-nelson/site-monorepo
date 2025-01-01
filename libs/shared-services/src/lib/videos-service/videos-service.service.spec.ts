import { TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { createSpyFromClass } from 'jest-auto-spies'
import { VideosService } from './videos-service.service'

describe('VideosServiceService', () => {
  let service: VideosService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: VideosService, useValue: createSpyFromClass(VideosService) },
      ],
    })
    service = TestBed.inject(VideosService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
