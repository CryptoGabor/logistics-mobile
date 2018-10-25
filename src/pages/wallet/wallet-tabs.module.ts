import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {WalletTabs} from "./wallet-tabs";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    declarations: [
        WalletTabs,
    ],
    imports: [
        IonicPageModule.forChild(WalletTabs),
        SharedModule
    ],
})
export class WalletTabsModule {
}
