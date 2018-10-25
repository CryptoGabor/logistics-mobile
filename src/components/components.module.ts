import {NgModule} from '@angular/core';
import {GeolocationComponent} from './geolocation/geolocation';
import {PicCaptureComponent} from './pic-capture/pic-capture';
import {QrReaderComponent} from './qr-reader/qr-reader';
import {TimerProgress} from "./timer-progress/timer-progress";
import {IonicModule} from "ionic-angular";

@NgModule({
    declarations: [
        GeolocationComponent,
        PicCaptureComponent,
        QrReaderComponent,
        TimerProgress,
    ],
    imports: [
        IonicModule
    ],
    exports: [
        GeolocationComponent,
        PicCaptureComponent,
        QrReaderComponent,
        TimerProgress,

    ]
})
export class ComponentsModule {
}
