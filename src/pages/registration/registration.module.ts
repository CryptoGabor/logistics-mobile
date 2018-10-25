import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {RegistrationPage} from "./registration";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    declarations: [
        RegistrationPage,
    ],
    imports: [
        IonicPageModule.forChild(RegistrationPage),
        SharedModule
    ],
    exports: [
        RegistrationPage
    ]
})
export class RegistrationPageModule {
}
