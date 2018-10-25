import {Component, ElementRef, ViewChild} from "@angular/core";
import {IonicPage, LoadingController, NavParams, ViewController} from "ionic-angular";
import {WalletService} from "../../../../services/restAPI/wallet.service";

@IonicPage()
@Component({
    selector: 'crypto-modal',
    templateUrl: 'crypto-modal.html'
})
export class CryptoModal {

    @ViewChild('addressInput') addressInput: ElementRef;

    currency: any;
    error: boolean;
    success: boolean;
    address: string;

    constructor(private walletService: WalletService,
                public params: NavParams,
                public viewCtrl: ViewController,
                public loadingCtrl: LoadingController) {
        this.currency = params.get('currency');
        this.walletService
            .getDepositAddress(this.currency)
            .subscribe((response: any) => {
                if (response.success) {
                    this.address = response.address;
                }
            });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    copyToClipboard() {
        this.addressInput.nativeElement.select();
        document.execCommand('copy');
    }
}
