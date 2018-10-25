import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SharedModule} from "../../../shared/shared.module";
import {LinkExpiredPage} from "./link-expired";

@NgModule({
    declarations: [
        LinkExpiredPage,
    ],
    imports: [
        IonicPageModule.forChild(LinkExpiredPage),
        SharedModule
    ],
    exports: [
        LinkExpiredPage
    ]
})
export class LinkExpiredPageModule {
}
