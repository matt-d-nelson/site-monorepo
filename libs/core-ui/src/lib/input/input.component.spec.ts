import { ComponentFixture, TestBed } from '@angular/core/testing'

import { InputComponent } from './input.component'
import { ComponentRef } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

describe('InputComponent', () => {
  let component: InputComponent
  let fixture: ComponentFixture<InputComponent>
  let componentRef: ComponentRef<InputComponent>
  const mockForm = new FormGroup({
    testControl: new FormControl(''),
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(InputComponent)
    component = fixture.componentInstance
    componentRef = fixture.componentRef
    componentRef.setInput('label', 'test')
    componentRef.setInput('parentForm', mockForm)
    componentRef.setInput('control', mockForm.get('testControl'))
    componentRef.setInput('type', 'text')
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
