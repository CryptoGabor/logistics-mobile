import {Injectable} from '@angular/core';
import {Events, Platform} from "ionic-angular";
import {OneSignal} from '@ionic-native/onesignal';
import {ENV} from '@app/env';

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {

    constructor(private events: Events,
                private platform: Platform,
                private oneSignal: OneSignal) {
        this.events.subscribe("push:init", (onNotificationReceived?, onNotificationOpened?) => {
            alert("Initializing Notification");
            this.init(onNotificationReceived ? onNotificationReceived :
                null, onNotificationOpened ? onNotificationOpened : null);
        });
    }

    init(onNotificationReceived?, onNotificationOpened?) {

        this.oneSignal.startInit(
            ENV.google.notification.appId,
            ENV.google.notification.googleProjectNumber
        );
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

        this.oneSignal.handleNotificationReceived().subscribe(() => {
            if (onNotificationReceived) onNotificationReceived();
            else console.log("onNotificationReceived");
        });

        this.oneSignal.handleNotificationOpened().subscribe(() => {
            if (onNotificationOpened) onNotificationOpened();
            else console.log("onNotificationOpened");
        });

        this.oneSignal.endInit();

    }

    getPlayerId() {
        if (this.platform.is('cordova')) {
            return this.oneSignal.getIds();
        } else {
            return new Promise((resolve) => {
                resolve(null);
            });
        }
    }

}
