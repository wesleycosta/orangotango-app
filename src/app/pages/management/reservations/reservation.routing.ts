import { Routes } from '@angular/router';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationUpsertComponent } from './reservation-upsert/reservation-upsert.component';

export const ReservationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ReservationListComponent,
      },
      {
        path: 'new',
        component: ReservationUpsertComponent,
      },
      {
        path: 'edit/:id',
        component: ReservationUpsertComponent
      },
    ],
  },
];
