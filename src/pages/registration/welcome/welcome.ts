import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, Platform} from 'ionic-angular';
import {UserService} from "../../../services/restAPI/user.service";
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html',
})
export class WelcomePage {


    profile;
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public userService: UserService,
                public loadingCtrl: LoadingController,
                public platform: Platform) {
        this.initProfile();
    }

    gotoHome() {
        this.navCtrl.push('HomeTabs');
    }

    gotoAccountVerification() {
        this.navCtrl.push('AccountVerificationPage');
    }

    private initProfile() {
        this.userService
            .getUserProfile()
            .then((response: any) => {
                if (response.success && response.profile) {
                    console.log(response);
                    this.profile = response.profile;
                }
            });
    }
}
