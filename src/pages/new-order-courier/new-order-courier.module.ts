import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {NewOrderCourierPage} from "./new-order-courier";
import {DirectivesModule} from "../../directives/directives.module";
import {ComponentsModule} from "../../components/components.module";
import {PipeModule} from "../../pipes/pipes.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    declarations: [
        NewOrderCourierPage,
    ],
    imports: [
        IonicPageModule.forChild(NewOrderCourierPage),
        DirectivesModule,
        PipeModule,
        ComponentsModule,
        SharedModule
    ],
    exports: [
        NewOrderCourierPage
    ]
})
export class NewOrderCourierPageModule {
}
