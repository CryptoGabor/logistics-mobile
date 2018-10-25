import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {StartPage} from "./start-page";
import {DirectivesModule} from "../../directives/directives.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    declarations: [
        StartPage,
    ],
    imports: [
        IonicPageModule.forChild(StartPage),
        DirectivesModule,
        SharedModule
    ],
    exports: [
        StartPage
    ]
})
export class StartPageModule {
}
