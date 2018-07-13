import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Helpers } from '../../../../../helpers';
import { CustomerService } from '../_services/customer.service';
import { ConfirmService } from '../../../../../shared/_services/confirm.service';


@Component({
  selector: 'app-customer-location-form',
  templateUrl: './customer-location-form.component.html',
  styles: []
})
export class CustomerLocationFormComponent implements OnInit {
  @Input() pid: number = null; // Product id
  @Input() ftype: string = null; // add & update
  @Output() onLocationSubmit: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private confirmService: ConfirmService
  ) {

  }

  formInit() {
    this.form = this.fb.group({
      l_type: ['BUSINESS', [Validators.required]],
      l_description: [null],
      l_address: [null, [Validators.required]],
      l_city: [null],
      l_country: [null],
      l_lat: [null],
      l_lng: [null],
      l_locality: [null],
      l_place_id: [null],
      l_postal_code: [null],
      l_route: [null],
      l_street_number: [null]
    });
  }

  onSubmit() {
    /* this.onLocationSubmit.emit(this.form.value); */

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    Helpers.setLoading(true);
    if (this.ftype == 'add') {
      this.addLocation();
    } else if (this.ftype == 'update') {
      this.updateLocation();
    }


  }

  handeResponse(res) {
    this.loading = false;
    Helpers.setLoading(false);
    this.onLocationSubmit.emit(res);
  }

  handeError(err) {
    this.loading = false;
    Helpers.setLoading(false);
    this.onLocationSubmit.emit(err);
  }

  updateLocation() {
    this.customerService.locationEdit(this.form.value, this.pid).subscribe(res => {
      this.handeResponse(res);
    }, err => {
      console.log(err);
      this.handeResponse(err);
    })
  }

  addLocation() {
    this.customerService.locationCreate(this.form.value, this.pid).subscribe(res => {
      this.handeResponse(res);

    }, err => {
      console.log(err);
      this.handeResponse(err);
    });
  }

  placeChanged(p) {
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

  onLoad() {
    this.customerService.locationGetById(this.pid).subscribe((item:any) => {
      console.log(item);
      this.form.patchValue({l_type:item.location_type});
      this.placeChanged(item);
    })
  }


  ngOnInit() {
    this.formInit();

    if(this.ftype == 'update') {
      this.onLoad();
    }

    console.log(this.pid);
    console.log(this.ftype);

  }

}
