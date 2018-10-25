import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';


@IonicPage()
@Component({
    template: `
        <ion-tabs>
            <ion-tab [tabTitle]="'homeCourier.title' | translate" [root]="homeCourier"></ion-tab>
            <ion-tab [tabTitle]="'requests.title' | translate" [root]="requests"></ion-tab>
        </ion-tabs>
    `
})

export class HomeCourierTabs {

    homeCourier: any = 'HomeCourierPage';
    requests: any = 'RequestsPage';


    constructor() {
    }

}
