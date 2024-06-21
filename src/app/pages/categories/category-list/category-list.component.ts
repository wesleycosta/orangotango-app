import { Component, OnInit } from '@angular/core';

export interface categoryModel {
  id: string;
  name: string;
}

const ELEMENT_DATA: categoryModel[] = [
  {
    id: '1010',
    name: 'Premium',
  },
  {
    id: '1010',
    name: 'Master',
  },
];
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }
}