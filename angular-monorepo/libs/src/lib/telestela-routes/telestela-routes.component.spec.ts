import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TelestelaRoutesComponent } from './telestela-routes.component';

describe('TelestelaRoutesComponent', () => {
  let component: TelestelaRoutesComponent;
  let fixture: ComponentFixture<TelestelaRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelestelaRoutesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TelestelaRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
