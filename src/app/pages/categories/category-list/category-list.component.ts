import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/core/components/delete-dialog/delete-dialog.component';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { CategoryModel } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  dataSource!: CategoryModel[];
  searchValue: string = '';
  showSpinner: boolean = false;

  constructor(private dialog: MatDialog,
    private categoryService: CategoryService,
    private notifierService: NotifierService) {
  }

  ngOnInit(): void {
    this.searchCategories();
  }

  searchCategories(): void {
    if (this.showSpinner) {
      return;
    }

    this.showSpinner = true;
    this.categoryService.search(this.searchValue).subscribe({
      next: (response) => {
        this.showSpinner = false;
        this.dataSource = response;
      },
    })
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchCategories();
    }
  }

  openDeleteDialog(id: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(confirmation => {
      if (!confirmation) {
        return;
      }

      this.categoryService.delete(id).subscribe({
        next: () => {
          debugger;
          this.dataSource = this.dataSource.filter(p => p.id != id);
          this.notifierService.notifySuccess();
        },
      })
    });
  }

  hasDataSource(): boolean {
    return this.dataSource && this.dataSource.length > 0;
  }
}