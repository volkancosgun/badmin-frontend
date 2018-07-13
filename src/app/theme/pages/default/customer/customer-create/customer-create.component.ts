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
            // Customer
            group_id: [1, [Validators.required]],
            business_name: [null],
            business_manager: [null],
            name: [null, [Validators.required]],
            sur_name: [null, Validators.required],
            description: [null],
            email: [null, [Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
            phone: [null],
            phone_lang: ['de'],
            phone_mobil: [null],
            phone_mobil_lang: ['de'],
            fax: [null],
            fax_lang: ['de'],
            tax: [null],
            tax_number: [null],
            iban:[null],
            bic: [null],
            sepa: [null],
            // Customer Location
            l_type: ['BUSINESS'],
            l_description: [null],
            l_address: [null],
            l_country: [null],
            l_city: [null],
            l_lat: [null],
            l_lng: [null],
            l_locality: [null],
            l_place_id: [null],
            l_postal_code: [null],
            l_route: [null],
            l_street_number: [null]
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
            l_address: p.address,
            l_country: p.country,
            l_city: p.locality,
            l_lat: p.lat,
            l_lng: p.lng,
            l_locality: p.city,
            l_place_id: p.place_id,
            l_postal_code: p.postal_code,
            l_route: p.route,
            l_street_number: p.street_number
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

        if (data.status === true) {
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

    changeLangPhone(value) {
        this.form.patchValue({ phone_lang: value.iso2 });
    }

    getNumberPhoneMobil(value) {
        this.form.patchValue({ phone_mobil: value });
    }

    changeLangPhoneMobil(value) {
        this.form.patchValue({ phone_mobil_lang: value.iso2 });
    }

    getNumberFax(value) {
        this.form.patchValue({ fax: value });
    }

    changeLangFax(value) {
        this.form.patchValue({ fax_lang: value.iso2 });
    }

    telInputObject(obj) {
        obj.intlTelInput('setCountry', 'de');
    }

}
