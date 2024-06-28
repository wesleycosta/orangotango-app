import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { MaterialModule } from 'src/app/material.module';
import { ReservationRoutes } from './reservation.routing';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationUpsertComponent } from './reservation-upsert/reservation-upsert.component';
import { ReservationService } from 'src/app/services/reservation.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ReservationRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
  ],
  declarations: [
    ReservationListComponent,
    ReservationUpsertComponent,
  ],
  providers: [
    ReservationService,
  ]
})
export class ReservationModule { }
