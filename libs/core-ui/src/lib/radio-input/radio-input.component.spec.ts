import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RadioInputComponent } from './radio-input.component'
import { ComponentRef } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

describe('RadioInputComponent', () => {
  let component: RadioInputComponent
  let componentRef: ComponentRef<RadioInputComponent>
  let fixture: ComponentFixture<RadioInputComponent>
  const mockForm = new FormGroup({
    testControl: new FormControl(''),
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioInputComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(RadioInputComponent)
    component = fixture.componentInstance
    componentRef = fixture.componentRef
    componentRef.setInput('label', 'test')
    componentRef.setInput('parentForm', mockForm)
    componentRef.setInput('control', mockForm.get('testControl'))
    componentRef.setInput('options', [])
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
