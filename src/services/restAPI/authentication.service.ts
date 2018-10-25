import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AbstractApiService} from "./base.service";
import {App} from "ionic-angular";


export class ROLES {
    static COURIER = 'COURIER';
    static CUSTOMER = 'CUSTOMER'
}

@Injectable()
export class AuthenticationService extends AbstractApiService {

    private isLoggedInChecked: boolean = false;

    constructor(protected app: App,
                protected http: HttpClient) {
        super(http);
        this.apiUrl = "api/auth";
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        this.app.getRootNav().push('StartPage');
        this.switchToCustomer();
    }

    login(user, disableLogEvent: boolean = false) {
        return this.http
            .post(`${this.getApiUrl()}/login/`, {
                username: user.username,
                password: user.password,
                disableLogEvent: disableLogEvent
            })
            .toPromise()
            .then((response: any) => {
                if (response.success) {
                    localStorage.setItem('token', response.token);
                    this.switchToCustomer();
                }
                return response;
            })
            .catch(response => {
                if (response.status == 401) {
                    return response.error;
                }
            });
    }

    signup(signupData) {
        signupData.mobile = true;
        return this.http
            .post(`${this.getApiUrl()}/signup/`, signupData)
            .toPromise()
            .then((response: any) => {
                return response;
            });
    }

    verifySignup(activationKey) {
        return this.http
            .post(`${this.getApiUrl()}/verifySignup/`, {
                activationKey: activationKey
            })
            .toPromise()
            .then((response: any) => {
                return response;
            });
    }

    verifyResetPassword(activationKey) {
        return this.http
            .post(`${this.getApiUrl()}/verifyResetPassword/`, {
                activationKey: activationKey
            })
            .toPromise()
            .then((response: any) => {
                return response;
            });
    }

    passwordReset(activationKey, newPassword) {
        return this.http
            .post(`${this.getApiUrl()}/resetPassword/`, {
                activationKey: activationKey,
                newPassword: newPassword
            })
            .toPromise()
            .then((response: any) => {
                return response;
            });
    }

    signupLevel1(formdata) {
        return this.http
            .post(`${this.getApiUrl()}/signupLevel1/`, formdata)
            .toPromise()
            .then((response: any) => {
                return response;
            });
    }

    verifyMobileNumber(formdata) {
        return this.http
            .post(`${this.getApiUrl()}/verifyMobileNumber/`, formdata)
            .toPromise()
            .then((response: any) => {
                return response;
            });
    }

    sendMobileVerification(email) {
        return this.http
            .post(
                `${this.getApiUrl()}/send2FASMS/`,
                {'email': email}
            );
    }


    isLoggedIn() {
        return localStorage.getItem('token') ? true : false;
    }

    sendPasswordResetEmail(email) {
        return this.http
            .post(`${this.getApiUrl()}/passwordRecovery/`, {
                email: email
            })
            .toPromise()
            .then((response: any) => {
                return response;
            });
    }

    switchToCourier(profile) {
        if (profile.forwarderData.verified) {
            localStorage.setItem('role', ROLES.COURIER);
        }
    }

    switchToCustomer() {
        localStorage.setItem('role', ROLES.CUSTOMER);
    }

}
