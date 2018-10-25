import {Component} from '@angular/core';
import {Events, IonicPage, NavController} from 'ionic-angular';
import {AuthenticationService} from "../../services/restAPI/authentication.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormValidators} from "../../utils/FormValidators";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    loginForm = new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        },
        {
            updateOn: 'submit'
        }
    );


    constructor(public navCtrl: NavController,
                public authenticationService: AuthenticationService,
                public events: Events) {
    }


    login({value, valid}: { value: FormControl, valid: boolean }) {
        FormValidators.validateAllFormFields(this.loginForm);
        if (valid) {
            this.authenticationService
                .login(value)
                .then((response: any) => {
                    if (response.success) {
                        this.events.publish("user:login");
                    }
                    if (response.error == 'login.failed') {
                        this.loginForm.get('password').setErrors({notfound: true});
                        this.loginForm.setErrors({notfound: true});
                    }
                });
        }
    }
}
