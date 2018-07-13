import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmService } from '../../../../../shared/_services/confirm.service';
import { CustomerModel } from '../_models/customer.model';
import { CustomerService } from '../_services/customer.service';
import { Helpers } from '../../../../../helpers';

@Component({
  selector: 'app-customer-location-create',
  templateUrl: './customer-location-create.component.html',
  styles: []
})
export class CustomerLocationCreateComponent implements OnInit {
  product_id: number = null;
  item : CustomerModel;
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
    this.customerService.getById(this.product_id).subscribe((data:CustomerModel) => {
      this.item = data;
      Helpers.setLoading(false);
    }, err => {
      console.log(err);
      Helpers.setLoading(false);
    });
  }

  onSubmit(data) {
    if (data.status === true) {
      this.confirmService.onSuccess();
      this.router.navigate(['customer/detail/', data.pid]);
    }
  }

}
