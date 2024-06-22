import { Component, OnInit } from '@angular/core';
import { categoryModel } from '../../../models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  dataSource!: categoryModel[];
  searchValue: string = '';
  showSpinner: boolean = false;

  constructor(private categoryService: CategoryService) { }

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
}