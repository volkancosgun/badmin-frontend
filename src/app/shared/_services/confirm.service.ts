import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class ConfirmService {
    toastSuccessT: String;
    toastSuccessM: String;
    toastErrorT: String;
    toastErrorM: String;
    toastDeleteY: String;
    toastDeleteN: String;
    toastDeleteM: String;
    private subject = new Subject<any>();
    constructor(
        private translate: TranslateService,
        private toastr: ToastrService
    ) {
        this.translate.get(['TOAST']).subscribe(values => {

            this.toastSuccessT = values.TOAST.SUCCESS.T;
            this.toastSuccessM = values.TOAST.SUCCESS.M;

            this.toastErrorT = values.TOAST.ERROR.T;
            this.toastErrorM = values.TOAST.ERROR.M;

            this.toastDeleteY = values.TOAST.DELETE.Y;
            this.toastDeleteN = values.TOAST.DELETE.N;
            this.toastDeleteM = values.TOAST.DELETE.M;
        });
    }

    onSuccess(msg?: string) {
        return this.toastr.success(`${msg || this.toastSuccessM}`, `${this.toastSuccessT}`);
    }

    onError(msg?: string) {
        return this.toastr.error(`${msg || this.toastErrorM}`, `${this.toastErrorT}`);
    }

    deleteConfirm(title: string, message?: string) {
        return swal({
            title: title,
            text: `${message || this.toastDeleteM}`,
            type: 'question',
            confirmButtonText: `${this.toastDeleteY}`,
            confirmButtonColor: '#4cae4c',
            showCancelButton: true,
            cancelButtonText: `${this.toastDeleteN}`,
            cancelButtonColor: '#d43f3a'
        }).then(res => {
            if (res.value == true) {
                return true;
            }

            return false;
        })
    }
}