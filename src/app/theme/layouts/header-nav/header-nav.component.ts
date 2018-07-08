import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import { AuthenticationService } from '../../../auth/_services/index';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../../auth/_services/token.service';
import { User } from '../../../auth/_models/index';
import { Observable } from 'rxjs/Observable';

declare let mLayout: any;
@Component({
    selector: "app-header-nav",
    templateUrl: "./header-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {
    public loggedIn: boolean;

    user: User;
    userName: string;
    profilePicture: string;
    constructor(
        private auth: AuthenticationService,
        private router: Router,
        private token: TokenService,
    ) {

    }
    ngOnInit() {

        this.auth.authStatus.subscribe(value => this.loggedIn = value);
        this.auth.me().subscribe(
            (data: User) => {
                this.user = data;
                this.userName = data.name;
            }
        );
    }

    ngAfterViewInit() {

        mLayout.initHeader();

    }

    otherLogout() {
        this.token.remove();
        this.auth.changeAuthStatus(false);
        this.router.navigateByUrl('/auth/login');
    }

    logout(event: MouseEvent) {

        event.preventDefault();

        this.token.remove();

        this.auth.changeAuthStatus(false);

        this.router.navigateByUrl('/auth/login');
    }

}