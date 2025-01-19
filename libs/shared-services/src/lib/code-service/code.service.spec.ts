import { TestBed } from '@angular/core/testing'

import { CodeService } from './code.service'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { createSpyFromClass } from 'jest-auto-spies'

describe('CodeService', () => {
  let service: CodeService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: CodeService, useValue: createSpyFromClass(CodeService) },
      ],
    })
    service = TestBed.inject(CodeService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
