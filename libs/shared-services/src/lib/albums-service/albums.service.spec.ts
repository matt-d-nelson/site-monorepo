import { TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { createSpyFromClass } from 'jest-auto-spies'
import { AlbumsService } from './albums.service'

describe('AlbumsService', () => {
  let service: AlbumsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AlbumsService, useValue: createSpyFromClass(AlbumsService) },
      ],
    })
    service = TestBed.inject(AlbumsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
