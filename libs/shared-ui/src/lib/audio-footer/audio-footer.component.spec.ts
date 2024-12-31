import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AudioFooterComponent } from './audio-footer.component'

describe('AudioFooterComponent', () => {
  let component: AudioFooterComponent
  let fixture: ComponentFixture<AudioFooterComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioFooterComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(AudioFooterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
