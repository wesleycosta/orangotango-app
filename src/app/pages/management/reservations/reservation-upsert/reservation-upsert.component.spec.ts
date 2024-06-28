import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationUpsertComponent } from './reservation-upsert.component';

describe('ReservationUpsertComponent', () => {
  let component: ReservationUpsertComponent;
  let fixture: ComponentFixture<ReservationUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservationUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
