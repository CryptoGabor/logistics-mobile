import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SharedModule} from "../../../shared/shared.module";
import {MobileVerificationPage} from "./mobile-verification";

@NgModule({
    declarations: [
        MobileVerificationPage,
    ],
    imports: [
        IonicPageModule.forChild(MobileVerificationPage),
        SharedModule
    ],
    exports: [
        MobileVerificationPage
    ]
})
export class MobileVerificationPageModule {
}
