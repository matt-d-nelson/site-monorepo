import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriviaLeaderboardsPageComponent } from './trivia-leaderboards-page.component';

describe('TriviaLeaderboardsPageComponent', () => {
  let component: TriviaLeaderboardsPageComponent;
  let fixture: ComponentFixture<TriviaLeaderboardsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriviaLeaderboardsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriviaLeaderboardsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
