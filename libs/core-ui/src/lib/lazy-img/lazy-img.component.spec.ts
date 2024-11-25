import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LazyImgComponent } from './lazy-img.component'

describe('LazyImgComponent', () => {
  let component: LazyImgComponent
  let fixture: ComponentFixture<LazyImgComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LazyImgComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(LazyImgComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
