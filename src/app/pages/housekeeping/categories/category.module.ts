import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { CategoryRoutes } from './category.routing';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryUpsertComponent } from './category-upsert/category-upsert.component';
import { CategoryService } from 'src/app/services/category.service';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CategoryRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
  ],
  declarations: [
    CategoryListComponent,
    CategoryUpsertComponent,
  ],
  providers: [
    CategoryService,
  ]
})
export class CategoryModule { }
