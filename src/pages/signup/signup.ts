import {Component} from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormValidators} from "../../utils/FormValidators";
import {AuthenticationService} from "../../services/restAPI/authentication.service";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class SignupPage {

    signupForm: FormGroup;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public authenticationService: AuthenticationService,
                public loadingCtrl: LoadingController,
                public modalCtrl: ModalController,
                public toastCtrl: ToastController) {
        this.signupForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            surname: new FormControl('', [Validators.required]),
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.email
            ])),
            username: new FormControl('', Validators.compose([
                Validators.required,
                Validators.maxLength(16)])),
        }, {updateOn: 'submit'});
        console.log(this.navParams.get("activationKey"));
    }

    ionViewDidLoad() {
    }


    signup({value, valid}: { value: FormControl, valid: boolean }) {
        let loading = this.loadingCtrl.create();
        FormValidators.validateAllFormFields(this.signupForm);
        if (valid) {
            loading.present();
            this.authenticationService
                .signup(value)
                .then(response => {
                    if (response.success
                        || response.error.code == 'signup.expired') {
                        this.openEmailModal();
                    } else {
                        if (response.error.code == 'email.alreadyregistered') {
                            this.signupForm.controls['email'].setErrors({
                                backend: {email: "Email already registered!"}
                            });
                        }
                        if (response.error.code == 'username.alreadyregistered') {
                            this.signupForm.controls['username'].setErrors({
                                backend: {username: "Username already taken!"}
                            });
                        }
                    }
                    loading.dismiss();
                })
                .catch(error => {
                    console.log(error);
                    loading.dismiss();
                });
        }
    }

    openEmailModal() {
        let emailModal = this.modalCtrl.create(
            'EmailConfirmationModal');
        emailModal.present();
    }

    gotoStart() {
        this.navCtrl.push('StartPage');
    }
}
