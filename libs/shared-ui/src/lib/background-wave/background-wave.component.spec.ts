import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundWaveComponent } from './background-wave.component';

describe('BackgroundWaveComponent', () => {
  let component: BackgroundWaveComponent;
  let fixture: ComponentFixture<BackgroundWaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundWaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgroundWaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
