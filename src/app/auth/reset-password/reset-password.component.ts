import { Component, OnInit, ComponentFactoryResolver, ViewEncapsulation, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, AlertService } from '../_services/index';
import { AlertComponent } from '../_directives/index';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-reset',
    templateUrl: './reset-password.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class ResetPasswordComponent implements OnInit {

    public error: any = [];

    public form = {
        email: null,
        password: null,
        password_confirmation: null,
        resetToken: null
    }

    @ViewChild('alertResetPassword',
        { read: ViewContainerRef }) alertResetPassword: ViewContainerRef;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private alertService: AlertService,
        private cfr: ComponentFactoryResolver,
        private toast: ToastrService
    ) {
        route.queryParams.subscribe(params => {
            this.form.resetToken = params['token'];
        });
    }

    onSubmit() {
        this.userService.changePassword(this.form).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        )
    }

    handleResponse(data) {
        this.showAlert('alertResetPassword');
        this.alertService.success(data.data);

        this.toast.success(data.data, 'İşlem Tamamlandı');

        let router = this.router;
        setTimeout(function() {
            router.navigate(['/auth/login']);
        }, 2000);
    }

    handleError(error) {
        this.error = error.error.errors || error.error;
        this.showAlert('alertResetPassword');
        this.alertService.error(this.error.email || this.error.password);
        let errormessage = error.error.error || this.error.email || this.error.password;
        this.toast.error(errormessage, 'HATA');
    }

    showAlert(target) {
        this[target].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this[target].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }

    ngOnInit() {
    }

}
