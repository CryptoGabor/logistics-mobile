import {Component} from '@angular/core';
import {IonicPage, NavController, ViewController} from 'ionic-angular';
import {AuthenticationService} from "../../services/restAPI/authentication.service";
import {OrderService} from "../../services/restAPI/order.service";
import {UserService} from "../../services/restAPI/user.service";

@IonicPage()
@Component({
    selector: 'page-home-courier',
    templateUrl: 'home-courier.html'
})
export class HomeCourierPage {

    tab1: any;
    tab2: any;
    profile: any;
    wallet: any;
    orders: any[] = [];

    constructor(public navCtrl: NavController,
                public orderService: OrderService,
                private userService: UserService,
                public authenticationService: AuthenticationService,
                public viewCtrl: ViewController) {
        this.tab1 = 'HomeCourierPage';
        this.tab2 = 'RequestsPage';
    }

    ionViewCanEnter() {
        return this.authenticationService.isLoggedIn();

    }

    ionViewDidEnter() {
        this.initOrders();
        this.initProfile();
    }

    goToOrderStatus(orderId) {
        this.navCtrl.push('OrderStatusCourierPage', {
            orderId: orderId
        })
    }

    goToOrderHistory() {
        this.navCtrl.push('OrderHistoryPage');
    }

    sortByDistance() {
        this.orders.sort((order1, order2) => {
            if (order1.distance < order2.distance) {
                return -1
            }
            if (order1.distance > order2.distance) {
                return 1
            }
            return 0;
        });
    }

    sortByTime() {
        this.orders.sort((order1, order2) => {
            let comparingField = (order1.state === 'TRANSIT' || order1.state === 'TRANSIT-2') ?
                'deliveryFrom' : 'pickupFrom';
            if (order1[comparingField] < order2[comparingField]) {
                return -1
            }
            if (order1[comparingField] > order2[comparingField]) {
                return 1
            }
            return 0;

        });
    }

    private initOrders() {
        this.orderService
            .getCourierHomeOrders('dateUpdated', 'asc', 1, 4)
            .subscribe((response: any) => {
                if (response.success) {
                    this.orders = response.orders;
                }
            });
    }

    private initProfile() {
        this.userService
            .getUserProfile()
            .then((response: any) => {
                if (response.success && response.profile) {
                    this.profile = response.profile;
                    this.wallet = response.wallet;
                }
            });
    }

}
