import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ImgInputComponent } from './img-input.component'
import { ComponentRef } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

describe('ImgInputComponent', () => {
  let component: ImgInputComponent
  let componentRef: ComponentRef<ImgInputComponent>
  let fixture: ComponentFixture<ImgInputComponent>
  const mockForm = new FormGroup({
    testControl: new FormControl(''),
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgInputComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ImgInputComponent)
    component = fixture.componentInstance
    componentRef = fixture.componentRef
    componentRef.setInput('parentForm', mockForm)
    componentRef.setInput('control', mockForm.get('testControl'))
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
