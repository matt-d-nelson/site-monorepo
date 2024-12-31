import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AudioProgressComponent } from './audio-progress.component'

describe('AudioProgressComponent', () => {
  let component: AudioProgressComponent
  let fixture: ComponentFixture<AudioProgressComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioProgressComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(AudioProgressComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
