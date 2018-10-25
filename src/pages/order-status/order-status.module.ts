import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {OrderStatusPage} from "./order-status";
import {PipeModule} from "../../pipes/pipes.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    declarations: [
        OrderStatusPage,
    ],
    imports: [
        PipeModule,
        IonicPageModule.forChild(OrderStatusPage),
        SharedModule
    ],
    exports: [
        OrderStatusPage,
    ]
})
export class OrderStatusPageModule {
}
