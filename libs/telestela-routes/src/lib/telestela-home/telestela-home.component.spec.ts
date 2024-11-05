import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelestelaHomeComponent } from './telestela-home.component';

describe('TelestelaHomeComponent', () => {
  let component: TelestelaHomeComponent;
  let fixture: ComponentFixture<TelestelaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelestelaHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelestelaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
