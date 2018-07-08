import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../default.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerGroupCreateComponent } from './customer-group-create/customer-group-create.component';
import { CustomerGroupListComponent } from './customer-group-list/customer-group-list.component';
import { CustomerGroupEditComponent } from './customer-group-edit/customer-group-edit.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

const routes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [
            {
                path: 'create',
                component: CustomerCreateComponent
            },
            {
                path: 'list',
                component: CustomerListComponent
            },
            {
                path: 'detail/:id',
                component: CustomerDetailComponent
            },
            {
                path: 'group/create',
                component: CustomerGroupCreateComponent
            },
            {
                path: 'group/list',
                component: CustomerGroupListComponent
            },
            {
                path: 'group/edit/:id',
                component: CustomerGroupEditComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }
