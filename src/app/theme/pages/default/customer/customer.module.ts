import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerGroupCreateComponent } from './customer-group-create/customer-group-create.component';
import { CustomerGroupListComponent } from './customer-group-list/customer-group-list.component';
import { CustomerService } from './_services/customer.service';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../../shared/shared.module';
import { CustomerGroupEditComponent } from './customer-group-edit/customer-group-edit.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerLocationFormComponent } from './customer-location-form/customer-location-form.component';
import { CustomerLocationCreateComponent } from './customer-location-create/customer-location-create.component';
import { CustomerLocationEditComponent } from './customer-location-edit/customer-location-edit.component';

@NgModule({
    imports: [
        CommonModule,
        CustomerRoutingModule,
        LayoutModule,
        ReactiveFormsModule,
        TranslateModule,
        NgxDatatableModule,
        SharedModule,
    ],
    providers: [CustomerService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA],
    declarations: [
        CustomerListComponent,
        CustomerCreateComponent,
        CustomerGroupCreateComponent,
        CustomerGroupListComponent, CustomerGroupEditComponent, CustomerEditComponent, CustomerDetailComponent, CustomerLocationFormComponent, CustomerLocationCreateComponent, CustomerLocationEditComponent
    ]
})
export class CustomerModule { }
