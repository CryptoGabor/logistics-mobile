import {Component} from '@angular/core';
import {
    ActionSheetController,
    IonicPage,
    LoadingController,
    ModalController,
    NavController,
    NavParams,
    ToastController
} from 'ionic-angular';
import {AuthenticationService} from "../../services/restAPI/authentication.service";
import {OrderService} from "../../services/restAPI/order.service";
import {ENV} from "@app/env";

@IonicPage()
@Component({
    selector: 'page-order-status-courier',
    templateUrl: 'order-status-courier.html'
})
export class OrderStatusCourierPage {

    orderId: number;
    order: any;
    pinLength: number;
    collectPIN;
    deliveryConfirmationPIN;
    font_color;
    background_color;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public orderService: OrderService,
                public authenticationService: AuthenticationService,
                public toastCtrl: ToastController,
                public actionSheetCtrl: ActionSheetController,
                public modalCtrl: ModalController,
                public loadingCtrl: LoadingController) {
        this.orderId = this.navParams.get("orderId");
        this.pinLength = ENV.pinLength;
    }

    ionViewDidEnter() {
        this.orderService
            .getCourierOrder(this.orderId)
            .subscribe((response: any) => {
                if (response.success) {
                    this.order = response.order;
                    this.setOrderStatusStyle(this.order);
                    if (this.order.state === 'TRANSIT' || this.order.state === 'TRANSIT-2') {
                        this.collectPIN = this.order.collectPIN;
                    }
                    if (this.order.state === 'DELIVERED') {
                        this.deliveryConfirmationPIN = this.order.deliveryConfirmationPIN;
                    }
                }
            });
    }

    setOrderStatusStyle(order) {
        switch (order.state) {
            case 'ACCEPTED':
                this.font_color = '#fff';
                this.background_color = '#48A7E1';
                break;

            case ('TRANSIT' || 'TRANSIT-2'):
                this.font_color = '#fff';
                this.background_color = '#f7a800';
                break;

            case 'DELIVERED':
                this.font_color = '#fff';
                this.background_color = '#07A440';
                break;

            case 'NOT-DELIVERED':
                this.font_color = '#fff';
                this.background_color = '#C94343';
                break;

            case 'CANCELLED':
                this.font_color = '#fff';
                this.background_color = '#C94343';
                break;
        }
    }

    validateCollectPIN() {
        if (this.collectPIN.length === this.pinLength) {
            let loading = this.loadingCtrl.create();
            loading.present();
            this.orderService
                .collectOrder(this.orderId, this.collectPIN)
                .subscribe((response: any) => {
                    loading.dismiss();
                    if (response.success) {
                        this.order = response.order;
                        this.setOrderStatusStyle(this.order);
                        this.showStatusChangeToast();
                    }
                }, error => {
                    loading.dismiss();
                    console.log(error);
                })
        }
    }

    validateDeliveryConfirmationPIN() {
        if (this.deliveryConfirmationPIN.length === this.pinLength) {
            let loading = this.loadingCtrl.create();
            loading.present();
            this.orderService
                .deliverOrder(this.orderId, this.deliveryConfirmationPIN)
                .subscribe((response: any) => {
                    loading.dismiss();
                    if (response.success) {
                        this.order = response.order;
                        this.setOrderStatusStyle(this.order);
                        this.showStatusChangeToast();
                    }
                }, error => {
                    loading.dismiss();
                    console.log(error);
                })
        }
    }

    tooltipText(text) {
        switch (text) {
            case 'courierId':
                return 'You need to check if your ID match with the one that has been provided to the customer';
            case 'collectId':
                return 'You must enter the Collect ID provided at the collection site';
            case 'deliveryId':
                return 'You must enter the Delivery ID provided at the delivery site';
        }
    }

    openTooltip(message) {
        let tooltip = this.toastCtrl.create({
            message: this.tooltipText(message),
            showCloseButton: true,
            closeButtonText: 'X',
            position: 'bottom',
            cssClass: 'tooltip',
            dismissOnPageChange: true
        });
        tooltip.present();
    }

    openFeedbackModal() {
        let feedbackModal = this.modalCtrl.create('FeedbackPage',
            {
                order: this.order
            });
        feedbackModal.present()
    }

    openOptions() {
        let options = this.actionSheetCtrl.create({
            title: 'Select Option',
            cssClass: 'delivery-actions',
            buttons: [
                {
                    text: 'Attempt 2nd delivery',
                    icon: 'redo',
                    cssClass: 'second-attempt',
                    handler: () => {
                        this.orderService
                            .secondTransitOrder(this.orderId)
                            .subscribe((response: any) => {
                                if (response.success) {
                                    this.order = response.order;
                                    this.showStatusChangeToast();
                                }
                            });
                    }
                },
                {
                    text: 'Not Delivered',
                    icon: 'alert',
                    cssClass: 'not-delivered',
                    handler: () => {
                        this.orderService
                            .notDeliveredOrder(this.orderId)
                            .subscribe((response: any) => {
                                if (response.success) {
                                    this.order = response.order;
                                    this.showStatusChangeToast();
                                }
                            });
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    icon: 'backspace'
                }
            ]
        });
        options.present();
    }

    private showStatusChangeToast() {
        let toast = this.toastCtrl.create({
            message: `Order #${this.order.id} state changed to ${this.order.state}`,
            duration: 4000
        });
        toast.present();
    }

}

