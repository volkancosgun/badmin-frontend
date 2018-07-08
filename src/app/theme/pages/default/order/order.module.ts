import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../../layouts/layout.module';
import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@NgModule({
    imports: [
        CommonModule,
        OrderRoutingModule,
        LayoutModule
    ],
    declarations: [
        OrderListComponent,
        OrderCreateComponent,
        OrderDetailComponent
    ]
})
export class OrderModule { }