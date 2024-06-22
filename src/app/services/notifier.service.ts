import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class NotifierService {
    constructor(private toastr: ToastrService) {
    }

    public successfullyRegistered(): void {
        this.toastr.success('Successfully registered!');
    }
}