import {BaseService} from "./base.service";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CourierService extends BaseService {

    constructor(http: HttpClient) {
        super(http);
        this.apiUrl = "api/mobile/courier";
    }

    createCourier(formData) {
        return this.http
            .post(`${this.getApiUrl()}/create/`,
                formData,
                {headers: this.getHeaders()}
            );
    }

    editCourier(formData) {
        return this.http
            .put(`${this.getApiUrl()}/edit/`,
                formData,
                {headers: this.getHeaders()}
            );
    }

    getCourierByProfile() {
        return this.http
            .get(`${this.getApiUrl()}/profile/`,
                {headers: this.getHeaders()}
            );
    }

    toggleEnableNewRequests(enableNewRequests) {
        return this.http
            .post(`${this.getApiUrl()}/toggleEnableNewRequests/`,
                {enableNewRequests: enableNewRequests},
                {headers: this.getHeaders()}
            );
    }

    searchCourier(formData) {
        return this.http
            .post(`${this.getApiUrl()}/search/`,
                formData,
                {headers: this.getHeaders()}
            );
    }

    searchOrderRequests(formData) {
        return this.http
            .post(`${this.getApiUrl()}/requests/`,
                formData,
                {headers: this.getHeaders()}
            );
    }
}