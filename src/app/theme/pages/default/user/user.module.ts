import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../../../layouts/layout.module';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule,
        LayoutModule
    ],
    declarations: [ProfileComponent],
})
export class UserModule { }
