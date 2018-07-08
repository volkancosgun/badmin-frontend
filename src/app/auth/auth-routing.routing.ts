import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { BeforeAuthGuard } from './_guards/before-auth.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
    { path: '', component: AuthComponent },
    { path: 'login', component: AuthComponent, canActivate: [BeforeAuthGuard] },
    { path: 'resetPassword', component: ResetPasswordComponent, canActivate: [BeforeAuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {
}