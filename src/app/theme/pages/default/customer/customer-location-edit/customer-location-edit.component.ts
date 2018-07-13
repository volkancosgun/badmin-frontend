import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmService } from '../../../../../shared/_services/confirm.service';
import { CustomerModel } from '../_models/customer.model';
import { CustomerService } from '../_services/customer.service';
import { Helpers } from '../../../../../helpers';

@Component({
  selector: 'app-customer-location-edit',
  templateUrl: './customer-location-edit.component.html',
  styles: []
})
export class CustomerLocationEditComponent implements OnInit {
  product_id: number = null;
  item: CustomerModel;
  location: any = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private confirmService: ConfirmService,
    private customerService: CustomerService
  ) {
    route.params.subscribe(param => {
      this.product_id = param.id;
    });
  }

  ngOnInit() {
    Helpers.setLoading(true);
    this.customerService.locationGetById(this.product_id).subscribe((data: any) => {
      this.location = data;
      this.onLoad(data.customer_id);
    }, err => {
      console.log(err);
      Helpers.setLoading(false);
    });
  }

  onLoad(customer_id) {
    this.customerService.getById(customer_id).subscribe((data: CustomerModel) => {
      this.item = data;
      Helpers.setLoading(false);
    }, err => {
      console.log(err);
      Helpers.setLoading(false);
    });
  }

  onSubmit(data) {
    if (data === true) {
      this.confirmService.onSuccess();
      this.router.navigate(['customer/detail/', this.item.id]);
    }
  }

}
