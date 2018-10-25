import {NgModule} from '@angular/core';
import {GobackDirective} from './goback/goback';
import {GotopageDirective} from './gotopage/gotopage';
import {LogoutDirective} from "./logout/logout.directive";
import {AgmCoreModule} from "@agm/core";
import {ENV} from "@app/env";
import {GeocompleteDirective} from "./geocomplete/geocomplete";

let DIRECTIVES = [
    GobackDirective,
    GotopageDirective,
    LogoutDirective,
    GeocompleteDirective,
];

@NgModule({
    declarations: DIRECTIVES,
    imports: [
        AgmCoreModule.forRoot({
            apiKey: ENV.google.maps.apiKey,
            libraries: ["places"]
        }),
    ],
    exports: DIRECTIVES
})
export class DirectivesModule {
}
