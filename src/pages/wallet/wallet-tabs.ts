import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, Tabs} from 'ionic-angular';
import {AuthenticationService} from "../../services/restAPI/authentication.service";

/**
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    template: `
        <ion-tabs #walletTabs>
            <ion-tab tabTitle="DEPOSIT" [root]="deposit"></ion-tab>
            <ion-tab tabTitle="WITHDRAWAL" [root]="withdrawal"></ion-tab>
        </ion-tabs>
    `
})
export class WalletTabs {

    @ViewChild('walletTabs') walletTabs: Tabs;

    deposit: any = 'DepositPage';
    withdrawal: any = 'WithdrawalPage';

    constructor(public navCtrl: NavController,
                public authenticationService: AuthenticationService) {

    }

    ionViewDidEnter() {
        this.walletTabs.select(0);
    }

    ionViewCanEnter() {
        return this.authenticationService.isLoggedIn();
    }

}
