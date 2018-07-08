import { Injectable } from '@angular/core';
import { balamir } from '../../../../../../environments/balamir';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
/* import { CustomerGroup } from '../_models/customer-group.model';
import { CustomerModel } from '../_models/customer.model'; */

@Injectable()
export class CustomerService {

    constructor(
        private http: HttpClient
    ) {

    }

    create(data) {
        return this.http.post(`${balamir.API_URL}/customer/create`, data);
    }

    list() {
        return this.http.get(`${balamir.API_URL}/customer/list`);
    }

    getById(pid) {
        return this.http.get(`${balamir.API_URL}/customer/${pid}`);
    }

    edit(data, pid) {
        return this.http.post(`${balamir.API_URL}/customer/update/${pid}`, data);
    }

    delete(pid) {
        return this.http.get(`${balamir.API_URL}/customer/delete/${pid}`);
    }

    groupCreate(data) {
        return this.http.post(`${balamir.API_URL}/customer/group/create`, data);
    }

    groupList() {
        return this.http.get(`${balamir.API_URL}/customer/group/list`);
    }

    groupEdit(data, pid) {
        return this.http.post(`${balamir.API_URL}/customer/group/update/${pid}`, data);
    }

    groupDelete(pid) {
        return this.http.get(`${balamir.API_URL}/customer/group/delete/${pid}`);
    }

    groupGetById(pid) {
        return this.http.get(`${balamir.API_URL}/customer/group/${pid}`);
    }


}
