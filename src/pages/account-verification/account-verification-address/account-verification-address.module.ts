import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AccountVerificationAddressPage} from './account-verification-address';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
    declarations: [
        AccountVerificationAddressPage,
    ],
    imports: [
        IonicPageModule.forChild(AccountVerificationAddressPage),
        SharedModule
    ],
    exports: [
        AccountVerificationAddressPage
    ]
})
export class AccountVerificationAddressPageModule {
}
