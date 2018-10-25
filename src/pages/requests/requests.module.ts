import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {RequestsPage} from "./requests";
import {PipeModule} from "../../pipes/pipes.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    declarations: [
        RequestsPage
    ],
    imports: [
        PipeModule,
        IonicPageModule.forChild(RequestsPage),
        SharedModule
    ],
    exports: [
        RequestsPage
    ]
})
export class RequestsPageModule {
}
