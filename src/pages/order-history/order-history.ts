import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {AuthenticationService} from "../../services/restAPI/authentication.service";
import {OrderService} from "../../services/restAPI/order.service";
import {UserService} from "../../services/restAPI/user.service";

@IonicPage()
@Component({
    selector: 'page-order-history',
    templateUrl: 'order-history.html'
})
export class OrderHistoryPage {

    profile: any;
    wallet: any;
    completedOrders: any[] = [];

    constructor(public navCtrl: NavController,
                public orderService: OrderService,
                private userService: UserService,
                public authenticationService: AuthenticationService) {
        this.initProfile();

    }


    ionViewDidEnter() {
        if (this.isCustomer()) {
            this.orderService
                .getOrders('dateUpdated', 'asc', 1, 4)
                .subscribe((response: any) => {
                    if (response.success) {
                        this.completedOrders = response.orders.filter(obj =>
                            obj.state === 'DELIVERED' || obj.state === 'NOT-DELIVERED');
                    }
                });
        } else if (this.isCourier()) {
            this.orderService
                .getCourierOrders('dateUpdated', 'asc', 1, 4)
                .subscribe((response: any) => {
                    if (response.success) {
                        this.completedOrders = response.orders.filter(obj =>
                            obj.state === 'DELIVERED' || obj.state === 'NOT-DELIVERED');
                        console.log(this.completedOrders)
                    }
                });

        }
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

    goToOrderStatus(orderId) {
        let page = this.isCourier() ? 'OrderStatusCourierPage' : 'OrderStatusPage';
        this.navCtrl.push(page, {
            orderId: orderId
        })
    }

    isCourier() {
        return this.userService.isLoggedAsCourier();
    }

    isCustomer() {
        return this.userService.isLoggedAsCustomer();
    }
}
