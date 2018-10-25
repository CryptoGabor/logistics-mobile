import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {WithdrawalModal} from './withdrawal-modal';
import {SharedModule} from "../../../../shared/shared.module";

@NgModule({
    declarations: [
        WithdrawalModal,
    ],
    imports: [
        IonicPageModule.forChild(WithdrawalModal),
        SharedModule
    ],
    entryComponents: [
        WithdrawalModal
    ],
})
export class WithdrawalModalModule {}
