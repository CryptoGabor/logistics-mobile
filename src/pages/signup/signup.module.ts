import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SignupPage} from './signup';
import {DirectivesModule} from "../../directives/directives.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    declarations: [
        SignupPage,
    ],
    imports: [
        IonicPageModule.forChild(SignupPage),
        DirectivesModule,
        SharedModule
    ],
    exports: [
        SignupPage
    ]
})
export class SignupPageModule {
}
