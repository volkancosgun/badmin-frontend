import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScriptLoaderService } from '../_services/script-loader.service';
import { AuthenticationService } from './_services/authentication.service';
import { AlertService } from './_services/alert.service';
import { UserService } from './_services/user.service';
import { AlertComponent } from './_directives/alert.component';
import { Helpers } from '../helpers';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './_services/token.service';

import { ToastrService } from 'ngx-toastr';

declare let $: any;
declare let mUtil: any;

@Component({
    selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
    templateUrl: './templates/login-3.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class AuthComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    errors: any = [];

    errmsg: any = [];

    @ViewChild('alertSignin',
        { read: ViewContainerRef }) alertSignin: ViewContainerRef;
    @ViewChild('alertSignup',
        { read: ViewContainerRef }) alertSignup: ViewContainerRef;
    @ViewChild('alertForgotPass',
        { read: ViewContainerRef }) alertForgotPass: ViewContainerRef;

    constructor(
        private _http: HttpClient,
        private _router: Router,
        private _script: ScriptLoaderService,
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _authService: AuthenticationService,
        private _alertService: AlertService,
        private cfr: ComponentFactoryResolver,
        private token: TokenService,
        private toast: ToastrService
    ) {
    }

    ngOnInit() {
        this.model.remember = true;
        // get return url from route parameters or default to '/'
        /* this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
        this._router.navigate([this.returnUrl]); */

        this._script.loadScripts('body', [
            'assets/vendors/base/vendors.bundle.js',
            'assets/demo/default/base/scripts.bundle.js'], true).then(() => {
                Helpers.setLoading(false);
                this.handleFormSwitch();
                //this.handleSignInFormSubmit();
                //this.handleSignUpFormSubmit();
                //this.handleForgetPasswordFormSubmit();
            });

    }

    handleResponse(data) {
        this.token.handle(data.access_token);
        this._authService.changeAuthStatus(true);
        this._router.navigateByUrl('/index');
    }

    signin() {

        this.loading = true;
        this.hideAlert('alertSignin');
        this._authService.login(this.model).subscribe(
            data => {
                this.handleResponse(data);
            },
            error => {
                let errormessage = error.error.error || 'Sunucuyla bağlantı kurulamadı.';
                this.toast.error(errormessage, 'Giriş Yapılamadı!');
                this.loading = false;
            }
        );
    }

    signup() {
        this.loading = true;
        this.errmsg = [];
        this._userService.create(this.model).subscribe(
            data => {
                this.handleResponse(data);
                this.loading = false;
            },
            error => {
                this.loading = false;

                this.errmsg = error.error.errors;

                if (this.errmsg) {
                    this.errmsg = this.errmsg.name || this.errmsg.email || this.errmsg.password;
                } else {
                    this.errmsg = 'Sunucuyla bağlantı kurulamadı.';
                }

                this.toast.error(this.errmsg, 'Kayıt Başarısız!');

            }
        );
    }

    forgotPass() {
        this.loading = true;
        console.log(this.model);
        this._userService.sendPasswordResetLink(this.model).subscribe(
            (data: any) => {
                this.showAlert('alertSignin');
                this._alertService.success(data.data, true);

                this.toast.success(data.data, 'Gönderildi...');

                this.loading = false;
                this.displaySignInForm();
                this.model = {};
            },
            error => {

                this.showAlert('alertForgotPass');
                this._alertService.error(error.error.error);

                let errormessage = error.error.error;

                this.toast.error(errormessage, 'HATA');

                this.loading = false;
            }
        );
    }

    showAlert(target) {
        this[target].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this[target].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }

    hideAlert(target) {
        this[target].clear();
    }

    handleSignInFormSubmit() {
        $('#m_login_signin_submit').click((e) => {
            let form = $(e.target).closest('form');
            form.validate({
                rules: {
                    email: {
                        required: true,
                        email: true,
                    },
                    password: {
                        required: true,
                    },
                },
            });
            if (!form.valid()) {
                e.preventDefault();
                return;
            }
        });
    }

    displaySignUpForm() {
        let login = document.getElementById('m_login');
        mUtil.removeClass(login, 'm-login--forget-password');
        mUtil.removeClass(login, 'm-login--signin');

        mUtil.addClass(login, 'm-login--signup');
        mUtil.animateClass(login.getElementsByClassName('m-login__signup')[0], 'flipInX animated');
    }

    displaySignInForm() {
        let login = document.getElementById('m_login');
        mUtil.removeClass(login, 'm-login--forget-password');
        mUtil.removeClass(login, 'm-login--signup');
        try {
            $('form').data('validator').resetForm();
        } catch (e) {
        }

        mUtil.addClass(login, 'm-login--signin');
        mUtil.animateClass(login.getElementsByClassName('m-login__signin')[0], 'flipInX animated');
    }

    displayForgetPasswordForm() {
        let login = document.getElementById('m_login');
        mUtil.removeClass(login, 'm-login--signin');
        mUtil.removeClass(login, 'm-login--signup');

        mUtil.addClass(login, 'm-login--forget-password');
        mUtil.animateClass(login.getElementsByClassName('m-login__forget-password')[0], 'flipInX animated');
    }

    handleFormSwitch() {
        document.getElementById('m_login_forget_password').addEventListener('click', (e) => {
            e.preventDefault();
            this.displayForgetPasswordForm();
        });

        document.getElementById('m_login_forget_password_cancel').addEventListener('click', (e) => {
            e.preventDefault();
            this.displaySignInForm();
        });

        document.getElementById('m_login_signup').addEventListener('click', (e) => {
            e.preventDefault();
            this.displaySignUpForm();
        });

        document.getElementById('m_login_signup_cancel').addEventListener('click', (e) => {
            e.preventDefault();
            this.displaySignInForm();
        });
    }

    handleSignUpFormSubmit() {
        document.getElementById('m_login_signup_submit').addEventListener('click', (e) => {
            let btn = $(e.target);
            let form = $(e.target).closest('form');
            form.validate({
                rules: {
                    name: {
                        required: true,
                    },
                    email: {
                        required: true,
                        email: true,
                    },
                    password: {
                        required: true,
                    },
                    password_confirmation: {
                        required: true,
                    },
                    agree: {
                        required: true,
                    },
                },
            });
            if (!form.valid()) {
                e.preventDefault();
                return;
            }
        });
    }

    handleForgetPasswordFormSubmit() {

        document.getElementById('m_login_forget_password_submit').addEventListener('click', (e) => {
            let btn = $(e.target);
            let form = $(e.target).closest('form');
            form.validate({
                rules: {
                    email: {
                        required: true,
                        email: true,
                    },
                }
            });
            if (!form.valid()) {
                e.preventDefault();
                return;
            }
        });
    }

}