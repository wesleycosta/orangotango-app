import { RoomInputModel } from './../models/room-input.model';
import { RoomModel } from './../models/room.model';
import { RoomFullModel } from './../models/room-full.model';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, map } from "rxjs";
import { BaseService } from "../core/services/base.service";


@Injectable()
export class RoomService extends BaseService {
    private urlRoomsApi: string;

    constructor(private http: HttpClient) {
        super()
        this.urlRoomsApi = `${this.UrlApiGateway}/rooms/api/rooms`;
    }

    add(inputModel: RoomInputModel): Observable<RoomModel> {
        return this.http
            .post(this.urlRoomsApi, inputModel, super.GetHeaderJson())
            .pipe(map(super.extractData));
    }

    update(id: string, inputModel: RoomInputModel): Observable<RoomModel> {
        return this.http
            .put(this.getUrlWithId(id), inputModel, super.GetHeaderJson())
            .pipe(map(super.extractData));
    }

    delete(id: string): Observable<any> {
        return this.http
            .delete(this.getUrlWithId(id), super.GetHeaderJson())
            .pipe(map(super.extractData));
    }

    getById(id: string): Observable<RoomModel> {
        return this.http
            .get(this.getUrlWithId(id), super.GetHeaderJson())
            .pipe(map(super.extractData));
    }

    search(searchValue: string): Observable<RoomFullModel[]> {
        let url = `${this.urlRoomsApi}/search`;
        if (searchValue) {
            url = `?searchValue=${encodeURIComponent(searchValue)}`;
        }
        return this.http
            .get(url, super.GetHeaderJson())
            .pipe(map(super.extractData));
    }

    private getUrlWithId(id: string): string {
        return `${this.urlRoomsApi}/${id}`;
    }
}