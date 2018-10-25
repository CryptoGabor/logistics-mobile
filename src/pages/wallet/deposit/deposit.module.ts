import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {DepositPage} from './deposit';
import {DirectivesModule} from "../../../directives/directives.module";
import {PayPal} from "@ionic-native/paypal";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
    declarations: [
        DepositPage,
    ],
    imports: [
        IonicPageModule.forChild(DepositPage),
        DirectivesModule,
        SharedModule
    ],
    exports: [
        DepositPage
    ],
    providers: [
        PayPal
    ]
})
export class DepositPageModule {
}
