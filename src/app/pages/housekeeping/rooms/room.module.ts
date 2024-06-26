import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { MaterialModule } from 'src/app/material.module';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomUpsertComponent } from './room-upsert/room-upsert.component';
import { RoomRoutes } from './room.routing';
import { RoomService } from '../../../services/room.service';
import { CategoryService } from 'src/app/services/category.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RoomRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
  ],
  declarations: [
    RoomListComponent,
    RoomUpsertComponent,
  ],
  providers: [
    RoomService,
    CategoryService,
  ]
})
export class RoomModule { }
