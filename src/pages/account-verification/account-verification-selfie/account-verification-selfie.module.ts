import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AccountVerificationSelfiePage} from './account-verification-selfie';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
    declarations: [
        AccountVerificationSelfiePage,
    ],
    imports: [
        IonicPageModule.forChild(AccountVerificationSelfiePage),
        SharedModule
    ],
    exports: [
        AccountVerificationSelfiePage
    ]
})
export class AccountVerificationSelfiePageModule {
}
