import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../_services/customer.service';
import { Helpers } from '../../../../../helpers';
import { CustomerGroup } from '../_models/customer-group.model';
import { ToastrService } from 'ngx-toastr';
import { ConfirmService } from '../../../../../shared/_services/confirm.service';

@Component({
    selector: 'app-customer-group-edit',
    templateUrl: './customer-group-edit.component.html',
    styles: []
})
export class CustomerGroupEditComponent implements OnInit {
    product_id: number = null;
    item: CustomerGroup;
    form: FormGroup;
    ToastMessage
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private customerService: CustomerService,
        private confirmService: ConfirmService
    ) { }

    ngOnInit() {

        this.form = this.fb.group({
            name: [null, Validators.required],
            description: [null]
        });

        this.route.params.subscribe(param => {
            this.product_id = param.id;
            this.onLoad();
        });
    }

    onLoad() {
        Helpers.setLoading(true);

        if (!this.product_id) {
            this.router.navigate(['customer/group/list']);
        }

        this.customerService.groupGetById(this.product_id).subscribe((data: CustomerGroup) => {
            this.item = data;
            this.form.patchValue({
                name: data.name,
                description: data.description
            });
            Helpers.setLoading(false);
        }, err => {
            this.router.navigate(['/customer/group/list']);
            console.log(err);
        });
    }

    onSubmit() {
        if (this.form.valid) {
            Helpers.setLoading(true);
            this.customerService.groupEdit(this.form.value, this.product_id).subscribe(res => {
                Helpers.setLoading(false);
                if (res) {
                    this.confirmService.onSuccess();
                    this.router.navigate(['/customer/group/list']);
                }
            }, err => {
                console.log(err);
            });
        }
    }


}
