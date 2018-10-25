import {ComponentsModule} from "../../components/components.module";
import {NgModule} from "@angular/core";
import {DirectivesModule} from "../../directives/directives.module";
import {IonicPageModule} from "ionic-angular";
import {SettingsPage} from "./settings";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    declarations: [
        SettingsPage,
    ],
    imports: [
        IonicPageModule.forChild(SettingsPage),
        ComponentsModule,
        DirectivesModule,
        SharedModule
    ],
    exports: [
        SettingsPage
    ]
})
export class SettingsPageModule {
}
