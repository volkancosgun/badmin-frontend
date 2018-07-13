import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../_services/customer.service';
import { CustomerModel } from '../_models/customer.model';
import { Observable } from 'rxjs/Observable';
import { Helpers } from '../../../../../helpers';
import { ConfirmService } from '../../../../../shared/_services/confirm.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerGroup } from '../_models/customer-group.model';
import { ScriptLoaderService } from '../../../../../_services/script-loader.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-customer-detail',
    templateUrl: './customer-detail.component.html',
    styles: []
})
export class CustomerDetailComponent implements OnInit {
    product_id: number = null;
    item: CustomerModel;
    fItem: CustomerModel;
    groups: CustomerGroup;
    form: FormGroup;
    errorPhone: boolean = true;
    errorPhoneMobil: boolean = true;
    errorFax: boolean = true;
    loading: boolean = false;
    phoneObj;
    phoneMobilObj;
    faxObj;

    langLocationTypes: any = [];
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private customerService: CustomerService,
        private confirmService: ConfirmService,
        private fb: FormBuilder,
        private translate: TranslateService
    ) {
        route.params.forEach(param => {
            this.product_id = param.id;
        });
    }

    ngOnInit() {
        this.onLoad();
        this.formBuilder();

        this.translate.get(['LOCATION_TYPES']).subscribe(values => {
            this.langLocationTypes = values.LOCATION_TYPES;
        });
    }

    formBuilder() {
        this.form = this.fb.group({
            group_id: [null, [Validators.required]],
            business_name: [null],
            business_manager: [null],
            name: [null, [Validators.required]],
            sur_name: [null, [Validators.required]],
            email: [null, [Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
            phone: [null],
            phone_lang: [null],
            phone_mobil: [null],
            phone_mobil_lang: [null],
            fax: [null],
            fax_lang: [null],
            tax: [null],
            tax_number: [null],
            iban: [null],
            bic: [null],
            sepa: [null]
        });

        this.onChanges();
    }

    formInit(item) {
        this.form.patchValue({
            group_id: item.group_id,
            business_name: item.business_name,
            business_manager: item.business_manager,
            name: item.name,
            sur_name: item.sur_name,
            email: item.email,
            phone: item.phone,
            phone_lang: item.phone_lang,
            phone_mobil: item.phone_mobil,
            phone_mobil_lang: item.phone_mobil_lang,
            fax: item.fax,
            fax_lang: item.fax_lang,
            tax: item.tax,
            tax_number: item.tax_number,
            iban: item.iban,
            bic: item.bic,
            sepa: item.sepa
        });
    }

    onChanges(): void {
        this.form.get('phone_lang').valueChanges.subscribe(value => {
            if (value) {
                this.phoneObj.intlTelInput('setCountry', value);
            }
        });

        this.form.get('phone_mobil_lang').valueChanges.subscribe(value => {
            if (value) {
                this.phoneMobilObj.intlTelInput('setCountry', value);
            }
        });

        this.form.get('fax_lang').valueChanges.subscribe(value => {
            if (value) {
                this.faxObj.intlTelInput('setCountry', value);
            }
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
        this.customerService.edit(this.form.value, this.product_id).subscribe(data => {
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
        }
    }

    onLoad() {
        Helpers.setLoading(true);
        this.customerService.getById(this.product_id).subscribe((data: CustomerModel) => {
            this.item = data;
            this.formInit(data);
            Helpers.setLoading(false);
        }, err => {
            Helpers.setLoading(false);
            this.confirmService.onError();
            this.router.navigate(['customer/list']);
        });

        this.customerService.groupList().subscribe((data: CustomerGroup) => {
            this.groups = data;
        }, err => {
            console.log(err);
            this.confirmService.onError();
            this.router.navigate(['customer/list']);
        });
    }

    initFormPlaces(p) {
        /* this.form.patchValue({
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
        }); */
    }

    placeChanged(p) {
        //this.initFormPlaces(p);
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

    telInputObjectPhone(obj) {
        this.phoneObj = obj;
    }

    telInputObjectPhoneMobil(obj) {
        this.phoneMobilObj = obj;
    }

    telInputObjectFax(obj) {
        this.faxObj = obj;
    }

    onDeleteLocation(location) {

        let location_type;

        switch (location.location_type) {
            case 'BUSINESS':
                location_type = this.langLocationTypes.BUSINESS;
                break;
            case 'HOME':
                location_type = this.langLocationTypes.HOME;
                break;
            case 'BILLING':
                location_type = this.langLocationTypes.BILLING;
                break;
            case 'SHIPPING':
                location_type = this.langLocationTypes.SHIPPING;
                break;
            case 'CONTRACT':
                location_type = this.langLocationTypes.CONTRACT;
                break;
            case 'RECIPIENT':
                location_type = this.langLocationTypes.RECIPIENT;
                break;
            case 'OTHER':
                location_type = this.langLocationTypes.OTHER;
                break;
        }


        let msg = `${location_type}<br><small class="text-muted">${location.address}</small>`;
        this.confirmService.deleteConfirm(msg).then(res => {
            if (res) {
                Helpers.setLoading(true);
                this.customerService.locationDelete(location.id).subscribe(response => {
                    let index = this.item.locations.findIndex(d => d.id === location.id);
                    this.item.locations.splice(index, 1);
                    Helpers.setLoading(false);
                    this.confirmService.onSuccess();
                }, err => {
                    console.log(err);
                    this.confirmService.onError();
                });
            }
        });
    }

}
