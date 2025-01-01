import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PageWrapperComponent } from './page-wrapper.component'
import { ComponentRef } from '@angular/core'

describe('PageWrapperComponent', () => {
  let component: PageWrapperComponent
  let componentRef: ComponentRef<PageWrapperComponent>
  let fixture: ComponentFixture<PageWrapperComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageWrapperComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(PageWrapperComponent)
    component = fixture.componentInstance
    componentRef = fixture.componentRef
    componentRef.setInput('title', 'test')
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
