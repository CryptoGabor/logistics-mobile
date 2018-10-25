import {Component, Inject, LOCALE_ID} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, Platform} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {AuthenticationService} from "../../../services/restAPI/authentication.service";
import {FormValidators} from "../../../utils/FormValidators";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-mobile-verification',
    templateUrl: 'mobile-verification.html',
})
export class MobileVerificationPage {

    mobileVerificationForm: FormGroup;
    datePipe: DatePipe;
    profile;
    username;
    password;
    email;
    public unregisterBackButtonAction: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public authService: AuthenticationService,
                public loadingCtrl: LoadingController,
                public platform: Platform,
                @Inject(LOCALE_ID) locale: string) {

        this.datePipe = new DatePipe(locale);
        this.blockBackButton();
    }

    ionViewDidLoad() {
        this.username = this.navParams.get('username');
        this.password = this.navParams.get('password');
        this.email = this.navParams.get('email');
        this.profile = this.navParams.get('profile');
        this.initMobileVerificationForm(this.email, this.username, this.password);

    }

    ionViewWillLeave() {
        //try unlock hwback button
        try {
            this.unregisterBackButtonAction && this.unregisterBackButtonAction();
        } catch (e) {
        }
    }

    public blockBackButton(): void {
        //block hwback button
        this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
            return;
        }, 10);
    }


    processVerifyMobile({value, valid}: { value: any, valid: boolean }) {
        let loading = this.loadingCtrl.create();
        FormValidators.validateAllFormFields(this.mobileVerificationForm);
        if (valid) {
            loading.present();
            this.authService
                .verifyMobileNumber(value)
                .then(response => {
                    if (response.success) {
                        this.authService
                            .login({username: this.username, password: this.password})
                            .then(response => {
                                let index = this.navCtrl.getActive().index;
                                this.navCtrl.push('WelcomePage')
                                    .then(() => {
                                        this.navCtrl.remove(index);
                                    });
                                loading.dismiss();
                            });
                    } else {
                        this.mobileVerificationForm
                            .controls['code']
                            .setErrors({
                                backend: {code: "Verification code mismatch!"}
                            });
                        loading.dismiss();
                    }
                })
                .catch(error => {
                    console.log(error);
                    loading.dismiss();
                })
        }
    }


    private initMobileVerificationForm(email, username, password) {
        this.mobileVerificationForm = new FormGroup({
            code: new FormControl('', [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(4)
            ]),
            email: new FormControl(email, [Validators.required]),
            username: new FormControl(username, [Validators.required]),
            password: new FormControl(password, [Validators.required]),
        });
    }


    gotoHome() {
        this.navCtrl.push('HomeTabs');
    }

    gotoAccountVerification() {
        this.navCtrl.push('AccountVerificationPage');
    }
}
