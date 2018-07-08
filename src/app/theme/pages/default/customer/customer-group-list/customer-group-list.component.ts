import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';
import { CustomerService } from '../_services/customer.service';
import { CustomerGroup } from '../_models/customer-group.model';
import { ScriptLoaderService } from '../../../../../_services/script-loader.service';
import { Observable } from 'rxjs/Observable';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { Helpers } from '../../../../../helpers';
import { TranslateService } from '@ngx-translate/core';
import swall from 'sweetalert2';
import { ConfirmService } from '../../../../../shared/_services/confirm.service';


@Component({
    selector: 'app-customer-group-list',
    templateUrl: './customer-group-list.component.html',
    styles: []
})
export class CustomerGroupListComponent implements OnInit, AfterViewInit {
    groups: CustomerGroup[];
    temp: CustomerGroup[] = [];
    rows = [];
    tMessages = {
        emptyMessage: '',
        totalMessage: ''
    };
    toastSuccessT: String;
    toastSuccessM: String;

    tLimit = 10;
    loading: boolean = false;

    @ViewChild(DatatableComponent) table: DatatableComponent;
    constructor(
        private customerService: CustomerService,
        private _script: ScriptLoaderService,
        private toastr: ToastrService,
        private translate: TranslateService,
        private confirmService: ConfirmService
    ) { }

    ngOnInit() {
        this.onLoad();
        this.translate.get(['TABLE', 'TOAST']).subscribe(values => {
            this.tMessages.emptyMessage = values.TABLE.EMPTY;
            this.tMessages.totalMessage = values.TABLE.TOTAL;
            this.toastSuccessM = values.TOAST.SUCCESS.M;
            this.toastSuccessT = values.TOAST.SUCCESS.T;
        });
    }

    onLoad() {
        this.loading = true;
        this.customerService.groupList().subscribe((data: CustomerGroup[]) => {
            this.temp = [...data];
            this.groups = data;
            this.loading = false;
        }, error => {
            this.loading = false;
        });
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();

        const temp = this.temp.filter(function(d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });

        this.groups = temp;

        this.table.offset = 0;
    }

    onDelete(item) {
        let msg = `Bu müşteri grubunu silmek istiyor musun?`;

        this.confirmService.deleteConfirm(item.name, msg).then(res => {
            if (res) {
                Helpers.setLoading(true);
                this.customerService.groupDelete(item.id).subscribe(res => {
                    Helpers.setLoading(false);
                    this.toastr.success(`${this.toastSuccessM}`, `${this.toastSuccessT}`);
                    this.onLoad();
                }, err => {
                    console.log(err);
                    Helpers.setLoading(false);
                });
            }
        });

    }

    ngAfterViewInit() {

        this._script.loadScripts('app-customer-group-list', ['assets/app/js/balamir-table.js']);

    }

}
