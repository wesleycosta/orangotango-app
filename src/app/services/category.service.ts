import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseService } from 'src/app/services/base.service';
import { Observable, map } from "rxjs";
import { CategoryInputModel } from "../models/category-input.model";
import { categoryModel } from "../models/category.model";

@Injectable()
export class CategoryService extends BaseService {
    urlCategoryApi: string;

    constructor(private http: HttpClient) {
        super()
        this.urlCategoryApi = `${this.UrlApiGateway}/rooms/api/categories`;
    }

    add(input: CategoryInputModel): Observable<categoryModel> {
        return this.http
            .post(this.urlCategoryApi, input, super.GetHeaderJson())
            .pipe(map(super.extractData));
    }

    delete(id: string): Observable<any> {
        return this.http
            .delete(`${this.urlCategoryApi}/${id}`, super.GetHeaderJson())
            .pipe(map(super.extractData));
    }

    search(searchValue: string): Observable<categoryModel[]> {
        const url = `${this.urlCategoryApi}?searchValue=${encodeURIComponent(searchValue)}`;
        return this.http
            .get(url, super.GetHeaderJson())
            .pipe(map(super.extractData));
    }
}