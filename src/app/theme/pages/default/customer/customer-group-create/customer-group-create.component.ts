import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from '../_services/customer.service';
import { CustomerGroup } from '../_models/customer-group.model';
import { Helpers } from '../../../../../helpers';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-customer-group-create',
    templateUrl: './customer-group-create.component.html'
})
export class CustomerGroupCreateComponent implements OnInit {
    form: FormGroup;
    errors: any = [];
    group: CustomerGroup;
    loading: boolean = false;

    toastSuccessT: String;
    toastSuccessM: String;
    toastErrorT: String;
    toastErrorM: String;
    constructor(
        private fb: FormBuilder,
        private customerService: CustomerService,
        private toastr: ToastrService,
        private translate: TranslateService,
        private router: Router
    ) {
        this.translate.get(['TOAST']).subscribe(values => {
            let str = values.TOAST;
            this.toastSuccessT = str.SUCCESS.T;
            this.toastSuccessM = str.SUCCESS.M;
            this.toastErrorT = str.ERROR.T;
            this.toastErrorM = str.ERROR.M_R;

        });
    }

    ngOnInit() {
        this.form = this.fb.group({
            name: [null, Validators.required],
            description: [null]
        });
    }

    onSubmit() {

        Helpers.setLoading(true);
        this.loading = true;
        this.customerService.groupCreate(this.form.value).subscribe(
            data => {
                this.handleResponse(data);
            },
            error => {
                this.errorResponse(error);
            }
        );

    }

    handleResponse(res) {
        Helpers.setLoading(false);
        this.loading = false;
        if (res === true) {
            this.toastr.success(`${this.toastSuccessM}`, `${this.toastSuccessT}`);
            this.router.navigate(['/customer/group/list']);
        }
    }

    errorResponse(error) {
        Helpers.setLoading(false);
        this.loading = false;
        this.errors = error.error.errors;
        this.toastr.error(`${this.toastErrorM}`, `${this.toastErrorT}`);
    }

}
