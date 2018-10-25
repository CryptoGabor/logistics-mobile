import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {HomePage} from "./home";
import {PipeModule} from "../../pipes/pipes.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    declarations: [
        HomePage,
    ],
    imports: [
        PipeModule,
        IonicPageModule.forChild(HomePage),
        SharedModule
    ],
    exports: [
        HomePage
    ]
})
export class HomePageModule {
}
