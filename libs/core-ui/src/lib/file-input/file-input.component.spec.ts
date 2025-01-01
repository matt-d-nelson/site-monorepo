import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FileInputComponent } from './file-input.component'
import { ComponentRef } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

describe('FileInputComponent', () => {
  let component: FileInputComponent
  let componentRef: ComponentRef<FileInputComponent>
  let fixture: ComponentFixture<FileInputComponent>
  const mockForm = new FormGroup({
    testControl: new FormControl(''),
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileInputComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FileInputComponent)
    component = fixture.componentInstance
    componentRef = fixture.componentRef
    componentRef.setInput('label', 'test')
    componentRef.setInput('parentForm', mockForm)
    componentRef.setInput('control', mockForm.get('testControl'))
    componentRef.setInput('loading', false)
    componentRef.setInput('acceptedFiles', ['wav', 'mp3'])
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
