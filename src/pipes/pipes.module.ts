import {NgModule} from "@angular/core";
import {DistanceInKmsPipe} from "./order.pipes";
import {TimePipe} from "./util.pipes";


let COMPONENTS = [
    DistanceInKmsPipe,
    TimePipe
];


@NgModule({
    declarations: COMPONENTS,
    imports: [],
    exports: COMPONENTS,
})
export class PipeModule {
}