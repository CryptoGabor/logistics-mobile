import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {OrderHistoryPage} from "./order-history";
import {PipeModule} from "../../pipes/pipes.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    declarations: [
        OrderHistoryPage,
    ],
    imports: [
        PipeModule,
        IonicPageModule.forChild(OrderHistoryPage),
        SharedModule
    ],
    exports: [
        OrderHistoryPage
    ]
})
export class OrderHistoryModule {
}
