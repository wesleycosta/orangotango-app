import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./pages/housekeeping/categories/category.module').then((m) => m.CategoryModule),
      },
      {
        path: 'rooms',
        loadChildren: () =>
          import('./pages/housekeeping/rooms/room.module').then((m) => m.RoomModule),
      },
      {
        path: 'reservations',
        loadChildren: () =>
          import('./pages/management/reservations/reservation.module').then((m) => m.ReservationModule),
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
