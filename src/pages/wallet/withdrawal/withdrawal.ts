import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, ToastController} from 'ionic-angular';
import {UserService} from "../../../services/restAPI/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormValidators} from "../../../utils/FormValidators";

/**
 * Generated class for the WithdrawalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-withdrawal',
    templateUrl: 'withdrawal.html',
})
export class WithdrawalPage {

    profile: any;
    wallet: any;
    withdrawalForm: FormGroup;

    selectOptions = {
        title: 'Select Currency',
        cssClass: 'withdrawal-currency',
    };

    constructor(private userService: UserService,
                public navCtrl: NavController,
                public toastCtrl: ToastController,
                public modalCtrl: ModalController) {
        this.initWithdrawalForm();
    }

    ionViewDidLoad() {
        this.initProfile();
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

    private initWithdrawalForm() {
        this.withdrawalForm = new FormGroup({
                amount: new FormControl('', [Validators.required]),
                currency: new FormControl('', [Validators.required]),
                address: new FormControl('', [Validators.required]),
            },
            {
                updateOn: 'submit',
            }
        );
    }

    openWithdrawalModal({valid}: { valid: boolean }) {
        FormValidators.validateAllFormFields(this.withdrawalForm);
        if (valid) {
            let withdrawalModal = this.modalCtrl.create(
                'WithdrawalModal',
                {
                    'data': this.withdrawalForm.value,
                });
            withdrawalModal.present();
            withdrawalModal.onDidDismiss(success => {
                if (success) {
                    let toast = this.toastCtrl.create({
                        message: `Your request has been sent!`,
                        duration: 4000
                    });
                    toast.present();
                    this.withdrawalForm.reset();
                }
            })
        }
    }
}
