import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { CategoryInputModel } from 'src/app/models/category-input.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-upsert',
  templateUrl: './category-upsert.component.html',
  styleUrl: './category-upsert.component.scss'
})
export class CategoryUpsertComponent implements OnInit {
  form!: FormGroup;
  id: string | null = null;
  title: string | null = null;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private motifierService: NotifierService) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeRoute();
  }

  private initializeRoute(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.title = 'Edit Category';
        this.loadCategory();
        return;
      }

      this.title = 'New Category';
    });
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  save(): void {
    if (!this.form.valid) {
      return;
    }

    if (this.hasId()) {
      this.update();
      return;
    }

    this.insert();
  }

  private insert(): void {
    const inputModel = this.toInputModel();
    this.categoryService.add(inputModel).subscribe({
      next: this.processSuccess.bind(this),
      error: this.processError.bind(this)
    })
  }

  private update(): void {
    const inputModel = this.toInputModel();
    this.categoryService.update(this.getId(), inputModel).subscribe({
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

  private loadCategory(): void {
    if (!this.hasId()) {
      return;
    }
    this.categoryService.getById(this.getId()).subscribe((category) => {
      this.form.controls["name"].setValue(category.name);
    });
  }

  private hasId(): boolean {
    return this.id !== null;
  }

  private getId(): string {
    return this.id as string;
  }
}
