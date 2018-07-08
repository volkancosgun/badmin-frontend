import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutComponent } from "./auth/logout/logout.component";
import { BeforeAuthGuard } from './auth/_guards/before-auth.guard';

const routes: Routes = [
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule', canActivate: [BeforeAuthGuard] },
    { path: 'logout', component: LogoutComponent, canActivate: [BeforeAuthGuard] },
    { path: '', redirectTo: 'index', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }