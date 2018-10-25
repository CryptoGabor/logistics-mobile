import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {WithdrawalPage} from './withdrawal';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
    declarations: [
        WithdrawalPage,
    ],
    imports: [
        IonicPageModule.forChild(WithdrawalPage),
        SharedModule
    ],
    exports: [
        WithdrawalPage
    ]
})
export class WithdrawalPageModule {
}
