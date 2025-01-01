import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LazyImgComponent } from './lazy-img.component'
import { ComponentRef } from '@angular/core'

describe('LazyImgComponent', () => {
  let component: LazyImgComponent
  let fixture: ComponentFixture<LazyImgComponent>
  let componentRef: ComponentRef<LazyImgComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LazyImgComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(LazyImgComponent)
    component = fixture.componentInstance
    componentRef = fixture.componentRef
    componentRef.setInput('source', '')
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
