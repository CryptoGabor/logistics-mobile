import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {HomeCourierTabs} from "./home-courier-tabs";
import {PipeModule} from "../../pipes/pipes.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    declarations: [
        HomeCourierTabs,
    ],
    imports: [
        PipeModule,
        IonicPageModule.forChild(HomeCourierTabs),
        SharedModule
    ],
})
export class HomeCourierTabsModule {
}
