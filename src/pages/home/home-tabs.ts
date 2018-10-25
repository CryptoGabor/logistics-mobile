import {Component} from '@angular/core';
import {IonicPage, NavController, ViewController} from 'ionic-angular';
import {AuthenticationService} from "../../services/restAPI/authentication.service";

@IonicPage()
@Component({
    template: `
        <ion-tabs>
            <ion-tab [tabTitle]="'home.title' | translate" [root]="homePage"></ion-tab>
            <ion-tab [tabTitle]="'newOrder.title' | translate" [root]="newOrder"></ion-tab>
        </ion-tabs>`
})

export class HomeTabs {

    homePage: any = 'HomePage';
    newOrder: any = 'NewOrderPage';


    constructor(public navCtrl: NavController,
                public authenticationService: AuthenticationService,
                public viewCtrl: ViewController) {
    }

    ionViewCanEnter() {
        return this.authenticationService.isLoggedIn();
    }

}
