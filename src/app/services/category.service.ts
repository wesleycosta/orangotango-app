import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseService } from 'src/app/services/base.service';
import { Observable, map } from "rxjs";
import { CategoryInputModel } from "../models/category-input.model";

@Injectable()
export class CategoryService extends BaseService {
    urlCategoryApi: string;

    constructor(private http: HttpClient) {
        super()
        this.urlCategoryApi = `${this.UrlApiGateway}/rooms/api/categories`;
    }

    add(input: CategoryInputModel): Observable<any> {
        return this.http
            .post(this.urlCategoryApi, input, super.GetHeaderJson())
            .pipe(map(super.extractData));
    }
}