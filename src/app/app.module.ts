// DEPENDENCIES
import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
// NATIVE
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {Geolocation} from '@ionic-native/geolocation';
import {Camera} from '@ionic-native/camera';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {Keyboard} from '@ionic-native/keyboard';
// PAGES
import {MyApp} from './app.component';
// TEST PAGES
// SERVICES
import {NotificationProvider} from '../services/notification/notification';
import {OneSignal} from '@ionic-native/onesignal';
import {AuthenticationService} from "../services/restAPI/authentication.service";
import {UserService} from "../services/restAPI/user.service";
import {CountryService} from "../services/restAPI/country.service";
import {OrderService} from "../services/restAPI/order.service";
import {HttpClientModule, HttpClient} from "@angular/common/http";
import {DirectivesModule} from "../directives/directives.module";
import {Deeplinks} from "@ionic-native/deeplinks";
import {ComponentsModule} from "../components/components.module";
import {CourierService} from "../services/restAPI/courier.service";
import {SMS} from "@ionic-native/sms";
import {EmailComposer} from "@ionic-native/email-composer";
import {WalletService} from "../services/restAPI/wallet.service";
import {PipeModule} from "../pipes/pipes.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// COMPONENTS

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        MyApp,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        DirectivesModule,
        ComponentsModule,
        PipeModule,
        IonicModule.forRoot(MyApp, {
            platforms: {
                ios: {
                    scrollAssist: false,
                    autoFocusAssist: false
                },
                android: {
                    scrollAssist: false,
                    autoFocusAssist: false
                }
            },
            menuType: 'push',
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
    ],
    providers: [
        HttpClientModule,
        StatusBar,
        SplashScreen,
        Keyboard,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        Geolocation,
        Camera,
        SMS,
        EmailComposer,
        BarcodeScanner,
        NotificationProvider,
        OneSignal,
        Deeplinks,
        AuthenticationService,
        OrderService,
        UserService,
        WalletService,
        CountryService,
        CourierService,
    ]
})
export class AppModule {
}
