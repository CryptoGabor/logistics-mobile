import {Component} from '@angular/core';
import {
    ActionSheetController,
    IonicPage,
    ModalController,
    NavController,
    NavParams,
    Platform,
    ToastController
} from 'ionic-angular';
import {AuthenticationService} from "../../services/restAPI/authentication.service";
import {OrderService} from "../../services/restAPI/order.service";
import {ENV} from "@app/env";
import {EmailComposer} from "@ionic-native/email-composer";
import {SMS} from "@ionic-native/sms";

declare var cordova;

@IonicPage()
@Component({
    selector: 'page-order-status',
    templateUrl: 'order-status.html'
})
export class OrderStatusPage {

    order: any;
    orderId: number;
    pinLength: number;
    collectPIN;
    deliveryConfirmationPIN;
    font_color;
    background_color;
    loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
        'Curabitur sit amet risus vehicula, imperdiet elit a, mollis neque. ' +
        'Donec in malesuada ex. Proin ut congue odio. Interdum et malesuada ' +
        'fames ac ante ipsum primis in faucibus. Nullam aliquet eros dolor';

    constructor(public platform: Platform,
                public navCtrl: NavController,
                public navParams: NavParams,
                public orderService: OrderService,
                public authenticationService: AuthenticationService,
                public toastCtrl: ToastController,
                public actionCtrl: ActionSheetController,
                private emailComposer: EmailComposer,
                private sms: SMS,
                public modalCtrl: ModalController) {
        this.orderId = this.navParams.get("orderId");
        this.pinLength = ENV.pinLength;
    }

    ionViewDidEnter() {
        this.orderService
            .getOrder(this.orderId)
            .subscribe((response: any) => {
                console.log(response);
                if (response.success) {
                    this.order = response.order;
                    this.setOrderStatusStyle(this.order);
                }
            });
    }

    doRefresh(refresher) {
        setTimeout(() => {
            this.orderService
                .getOrder(this.orderId)
                .subscribe((response: any) => {
                    console.log(response);
                    if (response.success) {
                        this.order = response.order;
                        this.setOrderStatusStyle(this.order);
                    }
                });
            refresher.complete();
        }, 2000);
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

    openTooltip() {
        let tooltip = this.toastCtrl.create({
            message: this.loremIpsum,
            showCloseButton: true,
            closeButtonText: 'X',
            position: 'bottom',
            cssClass: 'tooltip',
            dismissOnPageChange: true
        });

        tooltip.present();
    }

    sendPinAction(pin, pinName) {
        const message = `Your ${pinName}:${pin} for Order #${this.order.id}`;
        let sendPin = this.actionCtrl
            .create({
                title: 'Send Pin',
                cssClass: 'send-pin-actions',
                buttons: [
                    {
                        text: 'Copy',
                        icon: 'ios-copy',
                        handler: () => {
                            if (this.platform.is("cordova")) {
                                cordova.plugins.clipboard.copy(pin);
                                let toast = this.toastCtrl.create({
                                    message: `${pin} copied to clipboard!`,
                                    duration: 4000
                                });
                                toast.present();
                            }
                        }
                    },
                    {
                        text: 'Send an SMS',
                        icon: 'text',
                        handler: () => {
                            console.log("sending sms..");
                            this.sms.send('', message, {
                                replaceLineBreaks: false,
                                android: {
                                    intent: 'INTENT'
                                }
                            });
                        }
                    },
                    {
                        text: 'Send an E-mail',
                        icon: 'mail',
                        handler: () => {
                            this.emailComposer.open({
                                to: '',
                                cc: '',
                                bcc: [],
                                attachments: [],
                                subject: 'LWF Instant Delivery PIN',
                                body: message,
                                isHtml: true
                            });
                        }
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        icon: 'backspace',
                        handler: () => {
                        }
                    }
                ]
            });
        sendPin.present();
    }

    openFeedbackModal() {
        let feedbackModal = this.modalCtrl.create('FeedbackPage',
            {
                order: this.order
            });
        feedbackModal.present()
    }
}
