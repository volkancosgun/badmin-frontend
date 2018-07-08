import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { AgmCoreModule } from '@agm/core';
import { NumbersDirective } from '../_directives/numbers.directive';
import { UpperCaseDirective } from '../_directives/uppercase.directive';
import { ConfirmService } from './_services/confirm.service';
import { CapitalizeDirective } from '../_directives/capitalize.directive';
import { MapSearchDirective } from '../_directives/map-search.directive';
import { DataFilterPipe } from '../_directives/data-filter.pipe';



@NgModule({
    imports: [
        CommonModule,
        BsDropdownModule.forRoot(),
        FormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBpc-nqt0XbiSWyNWucoE3VtWHc9YBspeI',
            libraries: ["places"],
            language: 'de'
          })
    ],
    declarations: [
        NumbersDirective,
        UpperCaseDirective,
        CapitalizeDirective,
        MapSearchDirective,
        DataFilterPipe
    ],
    exports: [
        NumbersDirective,
        UpperCaseDirective,
        CapitalizeDirective,
        MapSearchDirective,
        DataFilterPipe,
        CommonModule,
        NgxDatatableModule,
        Ng2TelInputModule,
        BsDropdownModule,
        AgmCoreModule,
        FormsModule
    ],
    providers: [ConfirmService]
})
export class SharedModule { }