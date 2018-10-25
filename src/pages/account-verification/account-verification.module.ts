import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AccountVerificationPage} from './account-verification';
import {DirectivesModule} from "../../directives/directives.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    declarations: [
        AccountVerificationPage,
    ],
    imports: [
        IonicPageModule.forChild(AccountVerificationPage),
        DirectivesModule,
        SharedModule
    ],
    exports: [
        AccountVerificationPage
    ]
})
export class AccountVerificationPageModule {
}
