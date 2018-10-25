import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, ToastController} from 'ionic-angular';
import {UserService} from "../../../services/restAPI/user.service";
import {AuthenticationService} from "../../../services/restAPI/authentication.service";
// import {PayPalConfig, PayPalEnvironment, PayPalIntegrationType} from "ngx-paypal";
import {ENV} from "@app/env";
import {WalletService} from "../../../services/restAPI/wallet.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

declare var paypal;

/**
 * Generated class for the DepositPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-deposit',
    templateUrl: 'deposit.html',
})
export class DepositPage {

    profile: any;
    wallet: any;
    loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
        'Curabitur sit amet risus vehicula, imperdiet elit a, mollis neque. ' +
        'Donec in malesuada ex. Proin ut congue odio. Interdum et malesuada ' +
        'fames ac ante ipsum primis in faucibus. Nullam aliquet eros dolor';

    // payPalConfig: PayPalConfig;
    depositForm: FormGroup;

    selectOptions = {
        title: 'Select Currency',
        cssClass: 'deposit-currency',
    };

    transaction = {
        amount: 0,
        currency: ''
    };

    constructor(private userService: UserService,
                private walletService: WalletService,
                public navCtrl: NavController,
                public toastCtrl: ToastController,
                public authenticationService: AuthenticationService,
                public modalCtrl: ModalController) {
        this.initDepositForm();
    }

    ionViewDidEnter() {
        this.initProfile();
        this.initDepositForm();
        this.initConfig();

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

    openCryptoModal(currency) {
        if (currency === 'BTC' || currency === 'LWF') {
            let cryptoModal = this.modalCtrl.create(
                'CryptoModal',
                {
                    'currency': currency,
                });
            cryptoModal.present();
        }
    }

    isCourier() {
        return this.userService.isLoggedAsCourier();
    }

    isCustomer() {
        return this.userService.isLoggedAsCustomer();
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

    private initDepositForm() {
        this.depositForm = new FormGroup({
                amount: new FormControl('', [Validators.required, Validators.min(1)]),
                currency: new FormControl('', [Validators.required]),
            },
        );
        this.depositForm
            .valueChanges
            .subscribe(value => {
                if (this.depositForm.valid) {
                    this.transaction = {
                        amount: value.amount,
                        currency: value.currency
                    };
                    return this.transaction;
                }
            })
    }

    makePayment({value, valid}: { value: any, valid: boolean }) {
        if (valid) {
        }
    }

    toggleButton(actions) {
        this.depositForm.valid ? actions.enable() : actions.disable();
    }

    private initConfig(): void {
        let self = this;
        paypal.Button.render({
                env: 'sandbox',

                style: {
                    label: 'paypal',
                    size: 'medium',
                    shape: 'rect',
                    color: 'blue',
                    tagline: false
                },

                client: {
                    sandbox: ENV.paypal.accessKey,
                    production: '',
                },

                validate: (actions) => {
                    self.toggleButton(actions);

                    self.depositForm
                        .valueChanges
                        .subscribe(value => {
                            if (self.depositForm.valid) {
                                self.toggleButton(actions);
                            }
                        })
                },
                payment: (data, actions) => {
                    return actions.payment.create({
                        payment: {
                            transactions: [
                                {
                                    amount: {
                                        total: self.transaction.amount,
                                        currency: self.transaction.currency
                                    }
                                }
                            ]
                        }
                    });
                },

                onAuthorize: (data, actions) => {
                    return actions.payment.execute().then(() => {
                        self.walletService
                            .executePaypalPayment(data.paymentID, data.payerID)
                            .subscribe((response: any) => {
                                if (response.success) {
                                    let toast = this.toastCtrl.create({
                                        message: `Deposit Success!!`,
                                        duration: 4000
                                    });
                                    toast.present();
                                    this.initProfile();
                                    this.depositForm.reset();
                                } else {
                                    console.log(response.error);
                                }
                            }, error => {
                                console.log(error);
                            });
                    });
                },

                onCancel:
                    (data, actions) => {
                        console.log('OnCancel');
                        console.log(data, actions);
                    },
                onError:
                    (err) => {
                        console.log('OnError');
                        console.log(err);
                    },
            }

            ,
            '#paypal-button'
        );
    }

}


