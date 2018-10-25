import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {QrtestPage} from './qrtest';

@NgModule({
    declarations: [
        QrtestPage,
    ],
    imports: [
        IonicPageModule.forChild(QrtestPage),
    ],
})
export class QrtestPageModule {
}
