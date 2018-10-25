import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-link-expired',
    templateUrl: 'link-expired.html',
})
export class LinkExpiredPage {

    constructor(public navCtrl: NavController) {

    }


    gotoSignUp() {
        let index = this.navCtrl.getActive().index;
        this.navCtrl.push('SignupPage').then(() => {
            this.navCtrl.remove(index);
        });
    }

}
