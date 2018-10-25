import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";


export const ORDER_STATUS = {
    'new': 'NEW',
    'pending': 'PENDING',
    'delivering': 'DELIVERING',
    'delivered': 'DELIVERED',
};

export class Order {

    dateCreated;
    dateUpdated;
    state;
    buyer;
    courier;
    locationFrom;
    locationTo;
    pickupTimeSlot;
    deliveryTimeSlot;
    isUrgent;
    numberOfSmallBoxes;
    numberOfMediumBoxes;
    numberOfLargeBoxes;
    isSending;

    constructor() {
    }
}


@Injectable()
export class OrderService extends BaseService {

    constructor(http: HttpClient) {
        super(http);
        this.apiUrl = "api/mobile/order";
    }

    getOrders(sort: string, order: string, page: number, maxPerPage: number) {
        return this.http
            .post<Order>(`${this.getApiUrl()}/`,
                {sort: sort, order: order, page: page, maxPerPage: maxPerPage},
                {headers: this.getHeaders()}
            );
    }

    getHomeOrders(sort: string, order: string, page: number, maxPerPage: number) {
        return this.http
            .post<Order>(`${this.getApiUrl()}/home/`,
                {sort: sort, order: order, page: page, maxPerPage: maxPerPage},
                {headers: this.getHeaders()}
            );
    }

    getCourierOrders(sort: string, order: string, page: number, maxPerPage: number) {
        return this.http
            .post<Order>(`${this.getApiUrl()}/courier/`,
                {sort: sort, order: order, page: page, maxPerPage: maxPerPage},
                {headers: this.getHeaders()}
            );
    }

    getCourierHomeOrders(sort: string, order: string, page: number, maxPerPage: number) {
        return this.http
            .post<Order>(`${this.getApiUrl()}/courier/home/`,
                {sort: sort, order: order, page: page, maxPerPage: maxPerPage},
                {headers: this.getHeaders()}
            );
    }

    getOrder(orderId) {
        return this.http
            .get<Order>(`${this.getApiUrl()}/${orderId}`,
                {headers: this.getHeaders()}
            );
    }

    getCourierOrder(orderId) {
        return this.http
            .get<Order>(`${this.getApiUrl()}/courier/${orderId}`,
                {headers: this.getHeaders()}
            );
    }

    getNewCourierOrder(orderId) {
        return this.http
            .get<Order>(`${this.getApiUrl()}/courier/new/${orderId}`,
                {headers: this.getHeaders()}
            );
    }

    createOrder(formData) {
        return this.http
            .post<Order>(`${this.getApiUrl()}/create/`,
                formData,
                {headers: this.getHeaders()}
            );
    }

    editOrder(formData) {
        return this.http
            .post<Order>(`${this.getApiUrl()}/edit/`,
                formData,
                {headers: this.getHeaders()}
            );
    }

    acceptOrder(orderId) {
        return this.http
            .post<Order>(`${this.getApiUrl()}/accept/${orderId}`,
                {},
                {headers: this.getHeaders()}
            );
    }

    collectOrder(orderId, collectPIN) {
        return this.http
            .post<Order>(`${this.getApiUrl()}/collect/${orderId}`,
                {
                    collectPIN: collectPIN
                },
                {headers: this.getHeaders()}
            );
    }

    deliverOrder(orderId, deliveryConfirmationPIN) {
        return this.http
            .post<Order>(`${this.getApiUrl()}/deliver/${orderId}`,
                {
                    deliveryConfirmationPIN: deliveryConfirmationPIN
                },
                {headers: this.getHeaders()}
            );
    }

    secondTransitOrder(orderId) {
        return this.http
            .post<Order>(`${this.getApiUrl()}/transit2/${orderId}`,
                {},
                {headers: this.getHeaders()}
            );
    }

    notDeliveredOrder(orderId) {
        return this.http
            .post<Order>(`${this.getApiUrl()}/notDelivered/${orderId}`,
                {},
                {headers: this.getHeaders()}
            );
    }

    sendOrderFeedback(orderId, score, text) {
        return this.http
            .post<Order>(`${this.getApiUrl()}/feedback/${orderId}`,
                {
                    score: score,
                    text: text
                },
                {headers: this.getHeaders()}
            );
    }

}
