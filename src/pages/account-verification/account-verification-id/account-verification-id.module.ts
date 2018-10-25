import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AccountVerificationIdPage} from './account-verification-id';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
    declarations: [
        AccountVerificationIdPage,
    ],
    imports: [
        IonicPageModule.forChild(AccountVerificationIdPage),
        SharedModule
    ],
    exports: [
        AccountVerificationIdPage
    ]
})
export class AccountVerificationIdPageModule {
}
