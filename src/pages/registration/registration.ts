import {Component, Inject, LOCALE_ID} from '@angular/core';
import {ENV} from "../../environments/environment";
import {IonicPage, LoadingController, NavController, NavParams, Platform} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {AuthenticationService} from "../../services/restAPI/authentication.service";
import {CountryService} from "../../services/restAPI/country.service";
import {FormValidators} from "../../utils/FormValidators";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-registration',
    templateUrl: 'registration.html',
    providers: [
        CountryService
    ]
})
export class RegistrationPage {

    registrationForm: FormGroup;
    datePipe: DatePipe;
    activationKey: string;
    countries = [];
    profile;
    public unregisterBackButtonAction: any;

    selectCountries = {
        title: 'Select your country',
    };

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public countryService: CountryService,
                public authService: AuthenticationService,
                public loadingCtrl: LoadingController,
                public platform: Platform,
                @Inject(LOCALE_ID) locale: string) {

        this.activationKey = this.navParams.get("activationKey");
        this.profile = this.navParams.get("profile");
        this.datePipe = new DatePipe(locale);

        this.initRegistrationForm(this.profile);
        this.countries = this.countryService.getCounties();

    }


    ionViewDidLoad() {
    }

    ionViewWillLeave() {
        //try unlock hwback button
        try {
            this.unregisterBackButtonAction && this.unregisterBackButtonAction();
        } catch (e) {
        }
        ;
    }

    public blockBackButton(): void {
        //block hwback button
        this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
            return;
        }, 10);
    }


    signup({value, valid}: { value: any, valid: boolean }) {
        let loading = this.loadingCtrl.create();
        FormValidators.validateAllFormFields(this.registrationForm);
        if (valid) {
            loading.present();
            value.dob = this.datePipe.transform(value.dob, 'yyyy-MM-dd');
            value.mobile = value.mobilePrefix + value.mobile;
            value.verifyMobileNumber = ENV.verifyMobileNumber;
            this.authService
                .signupLevel1(value)
                .then(response => {
                    if (response.success) {
                        if (ENV.verifyMobileNumber) {
                            this.blockBackButton();
                            let index = this.navCtrl.getActive().index;
                            this.navCtrl.push('MobileVerificationPage', {
                                email: value.email,
                                username: value.username,
                                password: value.password,
                                profile: this.profile
                            }).then(() => {
                                this.navCtrl.remove(index);
                            });
                            loading.dismiss();
                        } else {
                            this.authService
                                .login({username: value.username, password: value.password})
                                .then(response => {
                                    loading.dismiss();
                                    this.gotoHome();
                                });
                        }
                    } else {
                        console.log(response);
                        loading.dismiss();
                    }

                })
                .catch(error => {
                    console.log(error);
                    loading.dismiss();
                });
        }
    }

    private initRegistrationForm(profile) {
        let mobile = this.getMobileWithoutDialCode(profile.mobile, profile.country);
        this.registrationForm = new FormGroup({
                name: new FormControl(profile.user.first_name, [Validators.required]),
                surname: new FormControl(profile.user.last_name, [Validators.required]),
                dob: new FormControl(profile.dob, [Validators.required]),
                country: new FormControl(profile.country, [Validators.required]),
                region: new FormControl(profile.region, [Validators.required]),
                city: new FormControl(profile.city, [Validators.required]),
                zipcode: new FormControl(profile.zipcode, [Validators.required]),
                ssn: new FormControl(profile.ssn, []),
                address: new FormControl(profile.address, [Validators.required]),
                mobilePrefix: new FormControl('', [Validators.required]),
                mobile: new FormControl(mobile, Validators.compose([
                    Validators.required,
                    Validators.min(1000000000),
                    Validators.max(9999999999999),
                ])),
                email: new FormControl(profile.user.email, Validators.compose([Validators.required, Validators.email])),
                username: new FormControl(profile.user.username, [Validators.required]),
                password: new FormControl('', Validators.compose([
                    Validators.required,
                    Validators.minLength(8)
                ])),
                confirmPassword: new FormControl('', Validators.compose([
                    Validators.required,
                    Validators.minLength(8)
                ])),
                agreement: new FormControl(false, Validators.compose([Validators.required, Validators.requiredTrue])),
                activationKey: new FormControl(this.activationKey, [Validators.required]),
            },
            {
                updateOn: 'submit',
                validators: FormValidators.passwordMatchValidator
            }
        );
        if (profile.country) {
            this.setMobilePrefix({value: profile.country});
        }
    }

    setMobilePrefix(event) {
        let mobilePrefix = this.countryService
            .getCountryByCode(event).dial_code;
        this.registrationForm.get('mobilePrefix')
            .setValue(mobilePrefix);
    }

    private getMobileWithoutDialCode(mobile: string, country) {
        if (!mobile || !country) {
            return '';
        }
        let mobilePrefix = this.countryService
            .getCountryByName(country).dial_code;
        return mobile.replace(mobilePrefix, '');
    }

    gotoHome() {
        this.navCtrl.push('HomeTabs');
    }

    gotoLinkExpired() {
        let index = this.navCtrl.getActive().index;
        this.navCtrl.push('LinkExpiredPage').then(
            () => {
                this.navCtrl.remove(index);
            });
    }
}
