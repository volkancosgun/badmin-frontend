import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/_guards/auth.guard';

const routes: Routes = [
    {
        'path': '',
        'component': ThemeComponent,
        'children': [
            {
                'path': 'index',
                'loadChildren': '.\/pages\/default\/blank\/blank.module#BlankModule',
                'canActivate': [AuthGuard],
            },
            {
                'path': 'user',
                'loadChildren': '.\/pages\/default\/user\/user.module#UserModule',
                'canActivate': [AuthGuard],
            },
            {
                'path': 'customer',
                'loadChildren': '.\/pages\/default\/customer\/customer.module#CustomerModule',
                'canActivate': [AuthGuard],
            },
            {
                'path': 'order',
                'loadChildren': '.\/pages\/default\/order\/order.module#OrderModule',
                'canActivate': [AuthGuard],
            },
            {
                'path': '',
                'redirectTo': 'index',
                'pathMatch': 'full',
            },
        ],
    },
    {
        'path': '**',
        'redirectTo': 'index',
        'pathMatch': 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ThemeRoutingModule { }