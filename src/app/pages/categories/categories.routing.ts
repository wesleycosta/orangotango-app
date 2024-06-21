import { Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';

export const CategoryRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CategoryListComponent,
      },
    ],
  },
];
