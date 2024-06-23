import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomUpsertComponent } from './room-upsert.component';

describe('RoomUpsertComponent', () => {
  let component: RoomUpsertComponent;
  let fixture: ComponentFixture<RoomUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
