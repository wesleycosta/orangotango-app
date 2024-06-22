import { badResultModel } from './../models/bad-result.model';
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class NotifierService {
    constructor(private toastr: ToastrService) {
    }

    public notifySuccess(): void {
        this.toastr.success('Processed successfully!');
    }

    public notifyErrors(httpError: HttpErrorResponse): void {
        if (!httpError.error) {
            return;
        }

        const badResult: badResultModel = httpError.error;
        badResult.errors.forEach(message => {
            this.toastr.error(message);
        });
    }
}