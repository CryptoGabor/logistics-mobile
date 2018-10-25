import {Component, EventEmitter, Output} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserService} from "../../services/restAPI/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import {FormValidators} from "../../utils/FormValidators";
import {ClickEvent, RatingChangeEvent} from "angular-star-rating";
import {OrderService} from "../../services/restAPI/order.service";

@IonicPage()
@Component({
    selector: 'page-feedback',
    templateUrl: 'feedback.html'
})
export class FeedbackPage {

    @Output() onVote = new EventEmitter();


    onClickResult: ClickEvent;
    onRatingChangeResult: RatingChangeEvent;
    feedbackForm: FormGroup;
    profile: any;
    order: any;
    isCourier = false;
    isBuyer = false;


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private userService: UserService,
                private orderService: OrderService) {
        this.order = this.navParams.get("order");


    }

    ionViewDidEnter() {
        this.initProfile();
        this.initFeedbackForm();
    }

    sendFeedback({value, valid}: { value: any, valid: boolean }) {
        FormValidators.validateAllFormFields(this.feedbackForm);
        this.onVote.emit(value);
        this.orderService
            .sendOrderFeedback(this.order.id, value.score, value.review)
            .subscribe((response: any) => {
                if (response.success) {
                    this.navCtrl.push(this.isCourier ? 'HomeCourierTabs' : 'HomeTabs');
                }
            });
    }

    onClick = ($event: ClickEvent) => {
        this.onClickResult = $event;
    };

    onRatingChange = ($event: RatingChangeEvent) => {
        this.onRatingChangeResult = $event;
    };

    private initProfile() {
        this.userService
            .getUserProfile()
            .then((response: any) => {
                if (response.success && response.profile) {
                    if (this.order.buyer.id == response.profile.id) {
                        this.isBuyer = true;
                        this.profile = this.order.courier;
                    } else if (this.order.courier.id == response.profile.id) {
                        this.isCourier = true;
                        this.profile = this.order.buyer
                    }
                }
            });
    }

    private initFeedbackForm() {
        this.feedbackForm = new FormGroup({
                score: new FormControl(0,),
                review: new FormControl('',),
            },
            {
                updateOn: 'submit',
            }
        );
    }
}
