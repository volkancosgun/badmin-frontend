import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CustomerModel } from '../_models/customer.model';
import { CustomerService } from '../_services/customer.service';
import { Observable } from 'rxjs/Observable';
import { Helpers } from '../../../../../helpers';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { TranslateService } from '@ngx-translate/core';
import { CustomerGroup } from '../_models/customer-group.model';
import { ConfirmService } from '../../../../../shared/_services/confirm.service';

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styles: []
})
export class CustomerListComponent implements OnInit, AfterViewInit {
    cols = [{ name: 'Müşteri No' }, { name: 'Adı' }, { name: 'Soyadı' }, { name: 'Telefon' }, { name: 'İşlemler' }];
    items: CustomerModel[];
    temp: CustomerModel[] = [];
    groups: CustomerGroup[];
    filterQ: string = "";
    selectedGroup: string = '';

    // Table Settings
    tMessages = {
        emptyMessage: '',
        totalMessage: ''
    };
    tLimit = 10;
    loading: boolean = true;

    @ViewChild(DatatableComponent) table: DatatableComponent;
    constructor(
        private customerService: CustomerService,
        private translate: TranslateService,
        private confirmService: ConfirmService
    ) { }

    ngOnInit() {
        this.translate.get(['TABLE']).subscribe(values => {
            this.tMessages.emptyMessage = values.TABLE.EMPTY;
            this.tMessages.totalMessage = values.TABLE.TOTAL;
        });
    }

    ngAfterViewInit() {
        this.onLoad();
    }

    onLoad() {
        this.loading = true;
        this.customerService.list().subscribe((data: CustomerModel[]) => {

            this.temp = [...data];
            this.items = data;
            this.loading = false;

        }, err => {
            this.loading = false;
            console.log(err);
        });

        this.groupList();
    }

    groupList() {
        Helpers.setLoading(true);
        this.customerService.groupList().subscribe((data: CustomerGroup[]) => {
            this.groups = data;
            Helpers.setLoading(false);
        }, err => {
            Helpers.setLoading(false);
            console.log(err);
        });
    }

    onDelete(item) {
        let msg = `Bu müşteriyi silmek istiyor musun?`;

        this.confirmService.deleteConfirm(item.name, msg).then(res => {
            if (res) {
                Helpers.setLoading(true);
                this.customerService.delete(item.id).subscribe(res => {
                    Helpers.setLoading(false);
                    this.confirmService.onSuccess();
                    this.onLoad();
                }, err => {
                    console.log(err);
                    Helpers.setLoading(false);
                });
            }
        });

    }

}
