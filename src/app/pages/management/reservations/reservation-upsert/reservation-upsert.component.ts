import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomInputModel } from '../../../../models/room-input.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { RoomModel } from 'src/app/models/room.model';
import { ReservationModel } from 'src/app/models/reservation.model';
import { ReservationStatus } from 'src/app/models/reservation-status.enum';
import { ReservationInputModel } from 'src/app/models/reservation-input.model';

@Component({
  selector: 'app-reservation-upsert',
  templateUrl: './reservation-upsert.component.html',
  styleUrl: './reservation-upsert.component.scss'
})
export class ReservationUpsertComponent implements OnInit {
  form!: FormGroup;
  id: string | null = null;
  title: string | null = null;
  rooms: RoomModel[] = [];
  public loadingRooms: boolean = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private motifierService: NotifierService) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadRooms();
  }

  private initializeRoute(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.title = 'Edit Reservation';
        this.loadInputFields();
        return;
      }

      this.title = 'New Reservation';
    });
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      guestName: ['', [Validators.required]],
      guestEmail: ['', [Validators.email, Validators.required]],
      room: ['', [Validators.required]],
      checkIn: ['', [Validators.required]],
      checkOut: ['', [Validators.required]],
      adults: ['', [Validators.required]],
      children: [''],
      value: ['', [Validators.required]],
    });
  }

  save(): void {
    if (!this.form.valid) {
      return;
    }

    if (this.hasId()) {
      this.update();
      return;
    }

    this.insert();
  }

  private insert(): void {
    const inputModel = this.toInputModel();
    this.reservationService.add(inputModel).subscribe({
      next: this.processSuccess.bind(this),
      error: this.processError.bind(this)
    })
  }

  private update(): void {
    const inputModel = this.toInputModel();
    this.reservationService.update(this.getId(), inputModel).subscribe({
      next: this.processSuccess.bind(this),
      error: this.processError.bind(this)
    })
  }

  goToReservations(): void {
    this.router.navigate(['/reservations']);
  }

  private processSuccess() {
    this.motifierService.notifySuccess();
    this.goToReservations();
  }

  private processError(data: HttpErrorResponse) {
    this.motifierService.notifyErrors(data);
  }

  private toInputModel(): ReservationInputModel {
    let children = 0;
    if (this.form.controls['children'].value) {
      children = Number(this.form.controls['children'].value)
    }

    return {
      guestName: this.form.controls['guestName'].value,
      guestEmail: this.form.controls['guestEmail'].value,
      roomId: this.form.controls['room'].value,
      adults: Number(this.form.controls['adults'].value),
      children,
      checkIn: new Date(this.form.controls['checkIn'].value),
      checkOut: new Date(this.form.controls['checkOut'].value),
      value: Number(this.form.controls['value'].value),
    }
  }

  private loadRooms(): void {
    this.reservationService.getRooms(this.id).subscribe({
      next: (response) => {
        this.loadingRooms = true;
        this.rooms = response;
        this.initializeRoute();
      },
    })
  }

  private loadInputFields(): void {
    if (!this.hasId()) {
      return;
    }
    this.reservationService.getById(this.getId()).subscribe((reservation) => {
      this.form.controls["guestName"].setValue(reservation.guestName);
      this.form.controls["guestEmail"].setValue(reservation.guestEmail);
      this.form.controls["checkIn"].setValue(reservation.checkIn);
      this.form.controls["checkOut"].setValue(reservation.checkOut);
      this.form.controls["room"].setValue(reservation.roomId);
      this.form.controls["adults"].setValue(reservation.adults);
      this.form.controls["children"].setValue(reservation.children);
      this.form.controls["value"].setValue(reservation.value);
    });
  }


  private hasId(): boolean {
    return this.id !== null;
  }

  private getId(): string {
    return this.id as string;
  }
}
