import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {CryptoModal} from './crypto-modal';
import {SharedModule} from "../../../../shared/shared.module";

@NgModule({
    declarations: [
        CryptoModal,
    ],
    imports: [
        IonicPageModule.forChild(CryptoModal),
        SharedModule
    ],
    entryComponents: [
        CryptoModal
    ]
})
export class CryptoModalModule {}
