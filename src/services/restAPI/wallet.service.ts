import {BaseService} from "./base.service";
import {Injectable} from "@angular/core";
import {App} from "ionic-angular";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class WalletService extends BaseService {

    constructor(protected app: App,
                protected http: HttpClient) {
        super(http);
        this.apiUrl = "api/wallet";
    }

    getDepositAddress(currency) {
        return this.http
            .post(`${this.getApiUrl()}/getAddress/`,
                {currency: currency},
                {headers: this.getHeaders()}
            );
    }

    executePaypalPayment(paymentId, payerId) {
        return this.http
            .post(`${this.getApiUrl()}/deposit/paypal/`,
                {
                    paymentId: paymentId,
                    payerId: payerId
                },
                {headers: this.getHeaders()}
            );
    }

    withDraw(data) {
        return this.http
            .post(`${this.getApiUrl()}/withdraw/`,
                data,
                {headers: this.getHeaders()}
            ).toPromise();
    }
}