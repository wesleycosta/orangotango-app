import { CategoryService } from 'src/app/services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../../services/room.service';
import { RoomInputModel } from '../../../../models/room-input.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { CategoryModel } from '../../../../models/category.model';

@Component({
  selector: 'app-room-upsert',
  templateUrl: './room-upsert.component.html',
  styleUrl: './room-upsert.component.scss'
})
export class RoomUpsertComponent implements OnInit {
  form!: FormGroup;
  id: string | null = null;
  title: string | null = null;
  categories: CategoryModel[] = [];
  public loadingCategories: boolean = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private roomService: RoomService,
    private categoryService: CategoryService,
    private motifierService: NotifierService) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadCategories();
  }

  private initializeRoute(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.title = 'Edit Room';
        this.loadInputFields();
        return;
      }

      this.title = 'New Room';
    });
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      number: ['', [Validators.required]],
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
    this.roomService.add(inputModel).subscribe({
      next: this.processSuccess.bind(this),
      error: this.processError.bind(this)
    })
  }

  private update(): void {
    const inputModel = this.toInputModel();
    this.roomService.update(this.getId(), inputModel).subscribe({
      next: this.processSuccess.bind(this),
      error: this.processError.bind(this)
    })
  }

  goToRooms(): void {
    this.router.navigate(['/rooms']);
  }

  private processSuccess() {
    this.motifierService.notifySuccess();
    this.goToRooms();
  }

  private processError(data: HttpErrorResponse) {
    this.motifierService.notifyErrors(data);
  }

  private toInputModel(): RoomInputModel {
    return {
      name: this.form.controls['name'].value,
      number: Number(this.form.controls['number'].value),
      categoryId: this.form.controls['category'].value,
    }
  }

  private loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (response) => {
        this.loadingCategories = true;
        this.categories = response;
        this.initializeRoute();
      },
    })
  }

  private loadInputFields(): void {
    if (!this.hasId()) {
      return;
    }
    this.roomService.getById(this.getId()).subscribe((room) => {
      this.form.controls["name"].setValue(room.name);
      this.form.controls["number"].setValue(room.number);
      this.form.controls["category"].setValue(room.categoryId);
    });
  }


  private hasId(): boolean {
    return this.id !== null;
  }

  private getId(): string {
    return this.id as string;
  }
}
