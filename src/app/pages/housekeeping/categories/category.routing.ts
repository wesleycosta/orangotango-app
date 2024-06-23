import { Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryUpsertComponent } from './category-upsert/category-upsert.component';

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
        component: CategoryUpsertComponent,
      },
      {
        path: 'edit/:id',
        component: CategoryUpsertComponent
      },
    ],
  },
];
