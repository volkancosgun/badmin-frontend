import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { CustomerService } from '../_services/customer.service';
import { CustomerGroup } from '../_models/customer-group.model';
import { Helpers } from '../../../../../helpers';
import { ConfirmService } from '../../../../../shared/_services/confirm.service';

declare var google: any;

@Component({
    selector: 'app-customer-create',
    templateUrl: './customer-create.component.html',
    styles: []
})
export class CustomerCreateComponent implements OnInit {
    form: FormGroup;
    errorPhone: boolean = true;
    errorPhoneMobil: boolean = true;
    errorFax: boolean = true;
    loading: boolean = false;
    customer_groups: CustomerGroup[];

    constructor(
        private fb: FormBuilder,
        private customerService: CustomerService,
        private confirmService: ConfirmService,
        private router: Router
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
            group_id: [1, [Validators.required]],
            name: [null, [Validators.required]],
            sur_name: [null, Validators.required],
            email: [null, [Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
            phone: [null],
            phone_mobil: [null],
            fax: [null],
            adr_address: [null],
            adr_country: [null],
            adr_city: [null],
            adr_lat: [null],
            adr_lng: [null],
            adr_locality: [null],
            adr_place_id: [null],
            adr_postal_code: [null],
            adr_route: [null],
            adr_street_number: [null]
        });


        this.onChanges();
        this.onLoad();

    }

    onLoad() {
        Helpers.setLoading(true);
        this.customerService.groupList().subscribe((data: CustomerGroup[]) => {
            this.customer_groups = data;
            Helpers.setLoading(false);
        }, err => {
            Helpers.setLoading(false);
        });
    }

    initFormPlaces(p) {
        this.form.patchValue({
            adr_address: p.address,
            adr_country: p.country,
            adr_city: p.locality,
            adr_lat: p.lat,
            adr_lng: p.lng,
            adr_locality: p.city,
            adr_place_id: p.place_id,
            adr_postal_code: p.postal_code,
            adr_route: p.route,
            adr_street_number: p.street_number
        });
    }

    placeChanged(p) {
        this.initFormPlaces(p);
    }

    onChanges(): void {

        this.form.get('phone').valueChanges.subscribe(val => {
            this.errorPhone = true;
        });

        this.form.get('phone_mobil').valueChanges.subscribe(val => {
            this.errorPhoneMobil = true;
        });

        this.form.get('fax').valueChanges.subscribe(val => {
            this.errorFax = true;
        });
    }

    onSubmit() {

        if (this.form.value.phone) {
            if (!this.errorPhone) {
                return false;
            }
        }

        if (this.form.value.phone_mobil) {
            if (!this.errorPhoneMobil) {
                return false;
            }
        }

        if (this.form.value.fax) {
            if (!this.errorFax) {
                return false;
            }
        }



        if (this.form.invalid) {
            return false;
        }

        Helpers.setLoading(true);
        this.loading = true;
        this.customerService.create(this.form.value).subscribe(data => {
            this.handleResponse(data);
        }, err => {
            console.log(err);
            this.handleError(err);
        });

    }

    handleError(err) {
        Helpers.setLoading(false);
        this.loading = false;

        this.confirmService.onError();
    }

    handleResponse(data) {
        Helpers.setLoading(false);
        this.loading = false;

        if (data === true) {
            this.confirmService.onSuccess();
            this.router.navigate(['customer/list']);
        }
    }

    hasErrorPhone(e) {
        this.errorPhone = e;
    }

    hasErrorPhoneMobil(e) {
        this.errorPhoneMobil = e;
    }

    hasErrorFax(e) {
        this.errorFax = e;
    }

    getNumberPhone(value) {
        this.form.patchValue({ phone: value });
    }

    getNumberPhoneMobil(value) {
        this.form.patchValue({ phone_mobil: value });
    }

    getNumberFax(value) {
        this.form.patchValue({ fax: value });
    }

    telInputObject(obj) {
        obj.intlTelInput('setCountry', 'de');
    }

}
