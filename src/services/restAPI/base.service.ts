import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ENV} from "@app/env";

@Injectable()
export abstract class AbstractApiService {

    apiUrl: string;  // URL to web api
    apiPort: Number = ENV.restApi.port;
    apiHost: string = ENV.restApi.host;
    apiProtocol: string = ENV.restApi.protocol;
    apiPath: string = ENV.restApi.apiUrl;

    constructor(protected http: HttpClient) {
    }

    getApiUrl() {
        return `${this.apiProtocol}://${this.apiHost}:${this.apiPort}/${this.apiPath}${this.apiUrl}`;
    }

    getBaseUrl() {
        return `${this.apiProtocol}://${this.apiHost}:${this.apiPort}`;
    }

    getHeaders() {
        let token = localStorage.getItem('token');
        return new HttpHeaders()
            .append('x-custom-authorization', `Token ${token}`)
            .append('Content-Type', 'application/json');
    }

}

export class BaseService extends AbstractApiService {

    protected post(data: any): Promise<any> {
        const headers = this.getHeaders();
        return this.http
            .post(this.getApiUrl(), data, {headers: headers})
            .toPromise()
            .then((response: any) => response.json())
    }

    protected put(model: any) {
        const headers = this.getHeaders();
        const url = `${this.getApiUrl()}/${model._id}`;
        return this.http
            .put(url, model, {headers: headers})
            .toPromise()
            .then(() => model)
    }

}
