import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {UserService} from "../../services/restAPI/user.service";

@IonicPage()
@Component({
    selector: 'page-account-verification',
    templateUrl: 'account-verification.html',
})
export class AccountVerificationPage {

    profile;

    submitStatus = {
        docs: false,
        proofOfResidence: false,
        selfidoc: false,
    };

    constructor(public navCtrl: NavController,
                public userService: UserService) {
    }

    ionViewDidEnter() {
        this.userService
            .getUserProfile()
            .then((response: any) => {
                if (response.success && response.profile) {
                    this.profile = response.profile;
                    this.submitStatus.docs = this.userService.isDocsSumbit(this.profile);
                    this.submitStatus.proofOfResidence = this.userService.isProofOfresidenceSumbit(this.profile);
                    this.submitStatus.selfidoc = this.userService.isSelfIDocImageSumbit(this.profile);
                }
            });
    }
}
