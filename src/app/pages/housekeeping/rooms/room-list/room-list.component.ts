import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/core/components/delete-dialog/delete-dialog.component';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { RoomService } from '../../../../services/room.service';
import { RoomFullModel } from '../../../../models/room-full.model';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss'
})
export class RoomListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'categoryName', 'number', 'actions'];
  dataSource!: RoomFullModel[];
  searchValue: string = '';
  loadingData: boolean = false;

  constructor(private dialog: MatDialog,
    private roomService: RoomService,
    private notifierService: NotifierService) {
  }

  ngOnInit(): void {
    this.searchRooms();
  }

  searchRooms(): void {
    if (this.loadingData) {
      return;
    }

    this.loadingData = true;
    this.roomService.search(this.searchValue).subscribe({
      next: (response) => {
        this.loadingData = false;
        this.dataSource = response;
      },
    })
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchRooms();
    }
  }

  openDeleteDialog(id: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(confirmation => {
      if (!confirmation) {
        return;
      }

      this.roomService.delete(id).subscribe({
        next: () => {
          debugger;
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
}
