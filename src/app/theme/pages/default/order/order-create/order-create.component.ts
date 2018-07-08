import { Component, OnInit } from '@angular/core';
import { Helpers } from '../../../../../helpers';

@Component({
    selector: 'app-order-create',
    templateUrl: './order-create.component.html',
    styles: []
})
export class OrderCreateComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        console.log('Sipariş oluştur');
        Helpers.setTitle('Sipariş');

    }

}
