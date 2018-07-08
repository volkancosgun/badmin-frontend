import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../_services/customer.service';
import { CustomerModel } from '../_models/customer.model';
import { Observable } from 'rxjs/Observable';
import { Helpers } from '../../../../../helpers';
import { ConfirmService } from '../../../../../shared/_services/confirm.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerGroup } from '../_models/customer-group.model';

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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private confirmService: ConfirmService,
    private fb: FormBuilder
  ) {
    route.params.forEach(param => {
      this.product_id = param.id;
    });
  }

  ngOnInit() {
    this.onLoad();
    this.formBuilder();
  }

  formBuilder() {
    this.form = this.fb.group({
      group_id: [null, [Validators.required]],
      name: [null, [Validators.required]],
      sur_name: [null, [Validators.required]],
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
  }

  formInit(item) {
    this.form.patchValue({
      group_id: item.group_id,
      name: item.name,
      sur_name: item.sur_name,
      email: item.email,
      phone: item.phone,
      phone_mobil: item.phone_mobil,
      fax: item.fax,
      adr_address: item.adr_address,
      adr_country: item.adr_country,
      adr_city: item.adr_city,
      adr_lat: item.adr_lat,
      adr_lng: item.adr_lng,
      adr_locality: item.adr_locality,
      adr_place_id: item.adr_place_id,
      adr_postal_code: item.adr_postal_code,
      adr_route: item.adr_route,
      adr_street_number: item.adr_street_number
    })
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
