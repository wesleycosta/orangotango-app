import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryInputModel } from 'src/app/models/category-input.model';
import { CategoryService } from 'src/app/services/category.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.scss'
})
export class CategoryCreateComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder,
    private categoryService: CategoryService,
    private motifierService: NotifierService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  save(): void {
    if (!this.form.valid) {
      return;
    }

    const inputModel = this.toInputModel();
    this.categoryService.add(inputModel).subscribe({
      next: this.processSuccess.bind(this),
      error: this.processError.bind(this)
    })
  }

  goToCategories(): void {
    this.router.navigate(['/categories']);
  }

  private processSuccess() {
    this.motifierService.notifySuccess();
    this.goToCategories();
  }

  private processError(data: HttpErrorResponse) {
    this.motifierService.notifyErrors(data);
  }

  private toInputModel(): CategoryInputModel {
    return {
      name: this.form.controls['name'].value
    }
  }
}
