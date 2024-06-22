import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { CategoryRoutes } from './categories.routing';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryService } from 'src/app/services/category.service';

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
    CategoryCreateComponent,
  ],
  providers: [
    CategoryService,
  ]
})
export class CategoriesModule { }
