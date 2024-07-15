import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/core/components/delete-dialog/delete-dialog.component';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { ReservationFullModel } from 'src/app/models/reservation-full.model';
import { ReservationStatus } from 'src/app/models/reservation-status.enum';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.scss'
})
export class ReservationListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'roomName', 'checkIn', 'checkOut', 'status', 'value', 'actions'];
  dataSource!: ReservationFullModel[];
  searchValue: string = '';
  loadingData: boolean = false;
  reservationStatus = ReservationStatus;

  constructor(private dialog: MatDialog,
    private reservationService: ReservationService,
    private notifierService: NotifierService) {
  }

  ngOnInit(): void {
    this.searchReservations();
  }

  searchReservations(): void {
    if (this.loadingData) {
      return;
    }

    this.loadingData = true;
    this.reservationService.search(this.searchValue).subscribe({
      next: (response) => {
        this.loadingData = false;
        this.dataSource = response;
      },
    })
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchReservations();
    }
  }

  openDeleteDialog(id: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(confirmation => {
      if (!confirmation) {
        return;
      }

      this.reservationService.delete(id).subscribe({
        next: () => {
          this.dataSource = this.dataSource.filter(p => p.id != id);
          this.notifierService.notifySuccess();
        },
        error: (error) => {
          this.notifierService.notifyErrors(error)
        }
      })
    });
  }

  hasDataSource(): boolean {
    return this.dataSource && this.dataSource.length > 0;
  }

  getStatusClass(status: ReservationStatus): string[] {
    switch (status) {
      case ReservationStatus.Booked:
        return ['text-success', 'bg-light-success'];
      case ReservationStatus.Cancelled:
        return ['text-error', 'bg-light-error'];
      case ReservationStatus.CheckIn:
        return ['text-accent', 'bg-light-accent'];
      case ReservationStatus.CheckOut:
        return ['text-primary', 'bg-light-primary '];
    }
  }

  confirmCheckIn(reservationId: string): void {
  }

  confirmCheckOut(reservationId: string): void {
  }

  confirmCancel(reservationId: string): void {
  }
}
