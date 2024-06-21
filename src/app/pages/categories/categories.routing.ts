import { Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryCreateComponent } from './category-create/category-create.component';

export const CategoryRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CategoryListComponent,
      },
      {
        path: 'new',
        component: CategoryCreateComponent,
      },
    ],
  },
];
