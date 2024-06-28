import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, map } from "rxjs";
import { BaseService } from "../core/services/base.service";
import { ReservationInputModel } from "../models/reservation-input.model";
import { ReservationModel } from "../models/reservation.model";
import { ReservationFullModel } from "../models/reservation-full.model";

@Injectable()
export class ReservationService extends BaseService {
    private urlReservations: string;

    constructor(private http: HttpClient) {
        super()
        this.urlReservations = `${this.UrlApiGateway}/management/api/reservations`;
    }

    add(input: ReservationInputModel): Observable<ReservationModel> {
        return this.http
            .post(this.urlReservations, input, super.GetHeaderJson())
            .pipe(map(super.extractData));
    }

    update(id: string, command: ReservationInputModel): Observable<ReservationModel> {
        return this.http
            .put(this.getUrlWithId(id), command, super.GetHeaderJson())
            .pipe(map(super.extractData));
    }

    delete(id: string): Observable<any> {
        return this.http
            .delete(this.getUrlWithId(id), super.GetHeaderJson())
            .pipe(map(super.extractData));
    }

    getById(id: string): Observable<ReservationModel> {
        return this.http
            .get(this.getUrlWithId(id), super.GetHeaderJson())
            .pipe(map(super.extractData));
    }

    search(searchValue: string): Observable<ReservationFullModel[]> {
        let url = `${this.urlReservations}/search`;
        if (searchValue) {
            url = `${url}?searchValue=${encodeURIComponent(searchValue)}`;
        }
        return this.http
            .get(url, super.GetHeaderJson())
            .pipe(map(super.extractData));
    }

    private getUrlWithId(id: string): string {
        return `${this.urlReservations}/${id}`;
    }
}