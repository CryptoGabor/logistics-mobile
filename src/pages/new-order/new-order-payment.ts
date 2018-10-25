import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {OrderService} from "../../services/restAPI/order.service";
import {UserService} from "../../services/restAPI/user.service";

@IonicPage()
@Component({
    selector: 'page-new-order-payment',
    templateUrl: 'new-order-payment.html',
})
export class NewOrderPaymentPage {

    devMode: boolean = true;
    order: any;
    profile: any;
    wallet: any;

    today: any = new Date();

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private userService: UserService,
                private orderService: OrderService) {

        this.order = this.navParams.get("order");
    }

    ionViewDidEnter() {
        this.userService
            .getUserProfile()
            .then((response: any) => {
                if (response.success && response.profile) {
                    console.log(response);
                    this.profile = response.profile;
                    this.wallet = response.wallet;
                }
            });
    }

    createAndPayOrder() {
        this.orderService
            .createOrder(this.order)
            .subscribe((response: any) => {
                if (response.success) {
                    this.navCtrl.push("HomeTabs");
                }
            });
    }
}
