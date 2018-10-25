import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {HomeCourierPage} from "./home-courier";
import {PipeModule} from "../../pipes/pipes.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    declarations: [
        HomeCourierPage,
    ],
    imports: [
        PipeModule,
        IonicPageModule.forChild(HomeCourierPage),
        SharedModule
    ],
    exports: [
        HomeCourierPage
    ]
})
export class HomeCourierPageModule {
}
