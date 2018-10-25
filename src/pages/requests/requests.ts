import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {CourierService} from "../../services/restAPI/courier.service";
import {ENV} from "@app/env";
import {CoordinateRangeConverter} from "../../utils/CoordinateRangeConverter";

@IonicPage()
@Component({
    selector: 'page-requests',
    templateUrl: 'requests.html'
})
export class RequestsPage {

    courier: any;
    profile: any;
    orderRequests = [];

    constructor(public navCtrl: NavController,
                private courierService: CourierService) {
    }

    ionViewDidEnter() {
        this.courierService
            .getCourierByProfile()
            .subscribe((response: any) => {
                if (response.success) {
                    this.courier = response.courier;
                    this.courier = response.courier;
                    if (this.courier.enableNewRequests) {
                        this.getOrderRequests();
                    } else {
                        this.orderRequests = [];
                    }
                }
            });
    }

    toggleRequests() {
        this.courierService
            .toggleEnableNewRequests(this.courier.enableNewRequests)
            .subscribe((response: any) => {
                if (response.success) {
                    this.courier = response.courier;
                    if (this.courier.enableNewRequests) {
                        this.getOrderRequests();
                    }
                }
            })
    }

    orderDetail(orderRequest) {
        this.navCtrl.push('NewOrderCourierPage', {
            order: orderRequest
        });
    }

    private getOrderRequests() {
        let latLngDelta = CoordinateRangeConverter
            .toCoordinateDelta({
                lat: this.courier.pickUpLocationLat,
                lng: this.courier.pickUpLocationLng
            }, ENV.courierSearchRangeInKm);
        this.courierService
            .searchOrderRequests({
                pickupLat: this.courier.pickUpLocationLat,
                pickupLng: this.courier.pickUpLocationLng,
                latDelta: latLngDelta.latDelta,
                lngDelta: latLngDelta.lngDelta,
            })
            .subscribe((response: any) => {
                if (response.success) {
                    this.orderRequests = response.orders;
                }
            })
    }

}

