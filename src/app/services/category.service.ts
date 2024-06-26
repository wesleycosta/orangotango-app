import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, map } from "rxjs";
import { BaseService } from "../core/services/base.service";
import { CategoryModel } from "../models/category.model";
import { CategoryInputModel } from "../models/category-input.model";

@Injectable()
export class CategoryService extends BaseService {
    private urlCategories: string;

    constructor(private http: HttpClient) {
        super()
        this.urlCategories = `${this.UrlApiGateway}/rooms/api/categories`;
    }

    add(input: CategoryInputModel): Observable<CategoryModel> {
        return this.http
            .post(this.urlCategories, input, super.GetHeaderJson())
            .pipe(map(super.extractData));
    }

    update(id: string, command: CategoryInputModel): Observable<CategoryModel> {
        return this.http
            .put(this.getUrlWithId(id), command, super.GetHeaderJson())
            .pipe(map(super.extractData));
    }

    delete(id: string): Observable<any> {
        return this.http
            .delete(this.getUrlWithId(id), super.GetHeaderJson())
            .pipe(map(super.extractData));
    }

    getById(id: string): Observable<CategoryModel> {
        return this.http
            .get(this.getUrlWithId(id), super.GetHeaderJson())
            .pipe(map(super.extractData));
    }

    getAll(): Observable<CategoryModel[]> {
        return this.http
            .get(this.urlCategories, super.GetHeaderJson())
            .pipe(map(super.extractData));
    }

    search(searchValue: string): Observable<CategoryModel[]> {
        const url = `${this.urlCategories}/search?searchValue=${encodeURIComponent(searchValue)}`;
        return this.http
            .get(url, super.GetHeaderJson())
            .pipe(map(super.extractData));
    }

    private getUrlWithId(id: string): string {
        return `${this.urlCategories}/${id}`;
    }
}