import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {OrderStatusCourierPage} from "./order-status-courier";
import {PipeModule} from "../../pipes/pipes.module";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
    declarations: [
        OrderStatusCourierPage,
    ],
    imports: [
        PipeModule,
        IonicPageModule.forChild(OrderStatusCourierPage),
        SharedModule

    ],
    exports: [
        OrderStatusCourierPage,
    ]
})
export class OrderStatusCourierPageModule {
}
