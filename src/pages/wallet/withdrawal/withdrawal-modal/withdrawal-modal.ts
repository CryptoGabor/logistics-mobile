import {Component} from "@angular/core";
import {IonicPage, LoadingController, NavParams, ViewController} from "ionic-angular";
import {WalletService} from "../../../../services/restAPI/wallet.service";

@IonicPage()
@Component({
    selector: 'page-withdrawal-modal',
    templateUrl: 'withdrawal-modal.html'
})
export class WithdrawalModal {

    data: any;
    error: boolean;
    success: boolean;

    constructor(private walletService: WalletService,
                public params: NavParams,
                public viewCtrl: ViewController,
                public loadingCtrl: LoadingController) {
        this.data = params.get('data');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }


    submitWithdrawal() {
        this.error = false;
        let loading = this.loadingCtrl.create();
        loading.present();
        this.walletService
            .withDraw(this.data).then((response: any) => {
            loading.dismiss();
            if (response.success) {
                this.success = true;
                this.viewCtrl.dismiss(this.success);
            } else {
                this.error = true;
            }
        }).catch(reason => {
            loading.dismiss();
            this.error = true;
            this.viewCtrl.dismiss();
        });
    }
}
