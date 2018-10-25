import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EmailConfirmationModal} from './email-confirmation-modal';

@NgModule({
    declarations: [
        EmailConfirmationModal,
    ],
    imports: [
        IonicPageModule.forChild(EmailConfirmationModal),
    ],
    entryComponents: [
        EmailConfirmationModal
    ]
})
export class EmailConfirmationModalModule {}
