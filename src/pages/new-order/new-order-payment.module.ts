import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {NewOrderPaymentPage} from "./new-order-payment";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    declarations: [
        NewOrderPaymentPage
    ],
    imports: [
        IonicPageModule.forChild(NewOrderPaymentPage),
        SharedModule
    ],
    exports: [
        NewOrderPaymentPage
    ]
})
export class NewOrderPaymentPageModule {
}
