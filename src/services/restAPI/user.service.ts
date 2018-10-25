import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {App} from "ionic-angular";
import {ROLES} from "./authentication.service";


@Injectable()
export class UserService extends BaseService {

    constructor(protected app: App,
                protected http: HttpClient) {
        super(http);
        this.apiUrl = "api/user";
    }

    uploadAvatarImage(imageData) {
        let headers = this.getHeaders();
        return this.http
            .post(`${this.getApiUrl()}/uploadAvatar/`,
                {avatarImage: imageData},
                {headers: headers}
            ).toPromise();
    }

    uploadIDDocFrontImage(imageData) {
        let headers = this.getHeaders();
        return this.http
            .post(`${this.getApiUrl()}/uploadIDDocFront/`,
                {IDDocFrontImage: imageData},
                {headers: headers}
            ).toPromise();
    }

    uploadIDDocBackImage(imageData) {
        let headers = this.getHeaders();
        return this.http
            .post(`${this.getApiUrl()}/uploadIDDocBack/`,
                {IDDocBackImage: imageData},
                {headers: headers}
            ).toPromise();
    }

    uploadProofOfresidenceImage(imageData) {
        let headers = this.getHeaders();
        return this.http
            .post(`${this.getApiUrl()}/uploadProofOfresidence/`,
                {ProofOfresidenceImage: imageData},
                {headers: headers}
            ).toPromise();
    }

    uploadSelfIDocImage(imageData) {
        let headers = this.getHeaders();
        return this.http
            .post(`${this.getApiUrl()}/uploadSelfIDoc/`,
                {SelfIDocImage: imageData},
                {headers: headers}
            ).toPromise();
    }

    getUserProfile() {
        return this.http
            .post(`${this.getApiUrl()}/profile/`,
                {},
                {headers: this.getHeaders()}
            ).toPromise();
    }

    isRecipient(profile) {
        if (profile.docVerified) {
            return true;
        }
        return false;
    }

    isCourier(profile) {
        if (profile.forwarderData.verified) {
            return true;
        }
        return false;
    }

    isLoggedAsCourier() {
        if (localStorage.getItem('role') === ROLES.COURIER) {
            return true;
        }
        return false;
    }

    isLoggedAsCustomer() {
        if (localStorage.getItem('role') === ROLES.CUSTOMER) {
            return true;
        }
        return false;
    }

    getFeedback() {
        return 0
    }

    isDocsSumbit(profile) {
        if (profile.IDDocFrontImage && profile.IDDocBackImage) {
            return true;
        }
        return false;
    }

    isProofOfresidenceSumbit(profile) {
        if (profile.ProofOfresidenceImage) {
            return true;
        }
        return false;
    }

    isSelfIDocImageSumbit(profile) {
        if (profile.SelfIDocImage) {
            return true;
        }
        return false;
    }

    changePassword(data) {
        return this.http
            .post(`${this.getApiUrl()}/changePassword/`,
                data,
                {headers: this.getHeaders()}
            ).toPromise();
    }

    addAddress(formData) {
        return this.http
            .post(`${this.getApiUrl()}/address/create/`,
                formData,
                {headers: this.getHeaders()}
            );
    }

    editAddress(formData) {
        return this.http
            .put(`${this.getApiUrl()}/address/edit/`,
                formData,
                {headers: this.getHeaders()}
            );
    }

    deleteAddress(addressId) {
        return this.http
            .delete(`${this.getApiUrl()}/address/delete/${addressId}`,
                {headers: this.getHeaders()}
            );
    }

    enable2FASMS(enable2FASMS) {
        return this.http
            .post(`${this.getApiUrl()}/profile/enable2FASMS/`,
                {enable2FASMS: enable2FASMS},
                {headers: this.getHeaders()}
            );
    }

    getForwarderFeedbacks(page: number, maxPerPage: number, forwarderId) {
        return this.http
            .post(`${this.getApiUrl()}/profile/forwarderFeedback/`,
                {
                    page: page,
                    maxPerPage: maxPerPage,
                    forwarderId: forwarderId
                },
                {headers: this.getHeaders()}
            );
    }

    getBuyerFeedbacks(page: number, maxPerPage: number, buyerId) {
        return this.http
            .post(`${this.getApiUrl()}/profile/buyerFeedback/`,
                {
                    page: page,
                    maxPerPage: maxPerPage,
                    buyerId: buyerId
                },
                {headers: this.getHeaders()}
            );
    }

    getUserNotifications() {
        return this.http
            .get(`${this.getApiUrl()}/notifications/`,
                {headers: this.getHeaders()}
            );
    }

    setNotificationAsRead() {
        return this.http
            .post(`${this.getApiUrl()}/notifications/read/`,
                {},
                {headers: this.getHeaders()}
            );
    }

    updatePlayerId(playerId) {
        console.log(playerId);
        return this.http
            .post(`${this.getApiUrl()}/updatePlayerId/`,
                playerId,
                {headers: this.getHeaders()}
            ).toPromise();
    }

}
