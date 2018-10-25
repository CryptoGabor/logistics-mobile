import {Component, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {OrderService} from "../../services/restAPI/order.service";
import * as moment from "moment";
import {TimerProgress} from "../../components/timer-progress/timer-progress";

@IonicPage()
@Component({
    selector: 'page-new-order-courier',
    templateUrl: 'new-order-courier.html'
})
export class NewOrderCourierPage {

    static MAX_ORDER_ETA = 600;

    @ViewChild(TimerProgress) timeProgress: TimerProgress;

    order: any;
    orderId: number;
    showTimer = true;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public loadingCtrl: LoadingController,
                private orderService: OrderService) {

        this.orderId = this.navParams.get("order").id;
    }

    ionViewDidEnter() {
        let loading = this.loadingCtrl.create();
        loading.present();
        this.orderService
            .getNewCourierOrder(this.orderId)
            .subscribe((response: any) => {
                loading.dismiss();
                if (response.success) {
                    this.order = response.order;
                    const timeToAccept = this.getOrderTimeToAccept();
                    if (timeToAccept > 0) {
                        this.timeProgress.timeInSeconds = timeToAccept;
                        this.timeProgress.initTimer();
                        this.timeProgress.startTimer();
                    } else {
                        this.timeProgress.timeInSeconds = 0;
                        this.timeProgress.initTimer();
                        this.showTimer = false;
                    }
                } else {
                    this.order = null;
                    this.timeProgress.timeInSeconds = 0;
                    this.timeProgress.initTimer();
                    this.showTimer = false;
                    this.navCtrl.push('HomeCourierPage');
                }
            }, error => {
                loading.dismiss();
                console.log(error);
            });
    }

    acceptOrder() {
        if (this.orderNotExpired()) {
            this.orderService
                .acceptOrder(this.order.id)
                .subscribe((response: any) => {
                    if (response.success) {
                        this.navCtrl.push('OrderStatusCourierPage', {
                            orderId: this.order.id
                        })
                    }
                });
        }
    }

    refuseOrder() {
        this.navCtrl.push('RequestsPage');
    }

    private getOrderTimeToAccept() {
        const nowDate = moment();
        const orderDate = moment(this.order.dateCreated);
        let duration = moment.duration(nowDate.diff(orderDate)).asSeconds();
        return NewOrderCourierPage.MAX_ORDER_ETA - duration;
    }

    private orderNotExpired() {
        return this.getOrderTimeToAccept() > 0;
    }

}
