import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../default.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';


const routes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [
            {
                path: 'create',
                component: OrderCreateComponent
            },
            {
                path: 'detail',
                component: OrderDetailComponent
            },
            {
                path: 'list',
                component: OrderListComponent
            },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderRoutingModule { }