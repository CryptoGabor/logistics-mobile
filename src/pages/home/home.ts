import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {AuthenticationService} from "../../services/restAPI/authentication.service";
import {OrderService} from "../../services/restAPI/order.service";
import {UserService} from "../../services/restAPI/user.service";

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    tab1: any;
    tab2: any;
    orders: any[] = [];
    profile: any;
    wallet: any;

    constructor(public navCtrl: NavController,
                public orderService: OrderService,
                private userService: UserService,
                public authenticationService: AuthenticationService) {
        this.tab1 = 'HomePage';
        this.tab2 = 'NewOrderPage';

    }

    ionViewCanEnter() {
        return this.authenticationService.isLoggedIn();
    }

    ionViewDidEnter() {
        this.orderService
            .getHomeOrders('dateUpdated', 'asc', 1, 4)
            .subscribe((response: any) => {
                if (response.success) {
                    this.orders = response.orders;
                }
            });
        this.initProfile();
    }

    orderAction(order) {
        this.navCtrl.push(
            order.state == 'NEW' ? 'NewOrderPaymentPage' : 'OrderStatusPage',
            {
                orderId: order.id
            });
    }

    goToOrderHistory() {
        this.navCtrl.push('OrderHistoryPage');
    }

    private initProfile() {
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
}
