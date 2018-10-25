import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {NewOrderPage} from "./new-order";
import {DirectivesModule} from "../../directives/directives.module";
import {ComponentsModule} from "../../components/components.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    declarations: [
        NewOrderPage,
    ],
    imports: [
        IonicPageModule.forChild(NewOrderPage),
        ComponentsModule,
        DirectivesModule,
        SharedModule
    ],
    exports: [
        NewOrderPage
    ]
})
export class NewOrderPageModule {
}
