import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {HomeTabs} from "./home-tabs";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    declarations: [
        HomeTabs,
    ],
    imports: [
        IonicPageModule.forChild(HomeTabs),
        SharedModule
    ],
})
export class HomeTabsModule {
}
