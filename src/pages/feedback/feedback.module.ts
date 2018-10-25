import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {DirectivesModule} from "../../directives/directives.module";
import {ComponentsModule} from "../../components/components.module";
import {FeedbackPage} from "./feedback";
import { StarRatingModule } from 'angular-star-rating';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    declarations: [
        FeedbackPage,
    ],
    imports: [
        IonicPageModule.forChild(FeedbackPage),
        ComponentsModule,
        DirectivesModule,
        StarRatingModule.forRoot(),
        SharedModule
    ],
    exports: [
        FeedbackPage
    ]
})
export class FeedbackPageModule {
}
