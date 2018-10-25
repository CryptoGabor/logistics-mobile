import {Component} from "@angular/core";
import {IonicPage, NavController, ViewController} from "ionic-angular";

@IonicPage()
@Component({
    selector: 'email-confirmation-modal',
    templateUrl: 'email-confirmation-modal.html'
})
export class EmailConfirmationModal{


    constructor(public navCtrl: NavController,
                public viewCtrl: ViewController) {
    }

    dismiss(){
        this.viewCtrl.dismiss();
    }


    gotoStart() {
        this.navCtrl.push('StartPage');
    }
}
