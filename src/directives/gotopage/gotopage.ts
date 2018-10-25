import {Directive, Input} from '@angular/core';
import {NavController} from "ionic-angular";

@Directive({
    selector: '[gotopage]', // Attribute selector
    host: {
        '(click)': 'goToPage()'
    }
})
export class GotopageDirective {
    @Input('gotopage') destination;
    routing: any;

    constructor(private navCtrl: NavController) {
        /* Init Routing */
        this.routing = [{}];
        this.routing["start"] = 'StartPage';
        this.routing["login"] = 'LoginPage';
        this.routing["signup"] = 'SignupPage';
        this.routing["qrcode"] = 'QrtestPage';
        this.routing["home"] = 'HomeTabs';
        this.routing["new-order"] = 'NewOrderPage';
        this.routing["new-order-payment"] = 'NewOrderPaymentPage';
        this.routing["home-courier"] = 'HomeCourierTabs';
        this.routing["account-verification"] = 'AccountVerificationPage';
        this.routing["account-verification-id"] = 'AccountVerificationIdPage';
        this.routing["account-verification-address"] = 'AccountVerificationAddressPage';
        this.routing["account-verification-selfie"] = 'AccountVerificationSelfiePage';
        this.routing["wallet"] = 'WalletTabs';
    }

    goToPage() {
        this.navCtrl.push(this.routing[this.destination]);
    }

}
