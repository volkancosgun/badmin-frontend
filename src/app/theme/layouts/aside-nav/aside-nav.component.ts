import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import { AuthenticationService } from '../../../auth/_services/index';

declare let mLayout: any;
@Component({
    selector: "app-aside-nav",
    templateUrl: "./aside-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AsideNavComponent implements OnInit, AfterViewInit {

    constructor(
        private auth: AuthenticationService
    ) {

    }
    ngOnInit() {

    }

    ngAfterViewInit() {

        mLayout.initAside();

    }

}