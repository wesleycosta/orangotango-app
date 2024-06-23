import { Routes } from '@angular/router';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomUpsertComponent } from './room-upsert/room-upsert.component';

export const RoomRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: RoomListComponent,
            },
            {
                path: 'new',
                component: RoomUpsertComponent,
            },
            {
                path: 'edit/:id',
                component: RoomUpsertComponent
            },
        ],
    },
];
