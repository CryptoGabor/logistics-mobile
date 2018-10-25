import {Component, ViewChild} from '@angular/core';
import {Events, MenuController, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {Keyboard} from '@ionic-native/keyboard';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Deeplinks} from "@ionic-native/deeplinks";
// import {RegistrationPage} from "../pages/registration/registration";
import {UserService} from "../services/restAPI/user.service";
import {AuthenticationService, ROLES} from "../services/restAPI/authentication.service";
import {NotificationProvider} from "../services/notification/notification";
import {TranslateService} from '@ngx-translate/core';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    @ViewChild(Nav) nav: Nav;
    rootPage: any = 'StartPage';
    profile: any;
    playerId: any;

    constructor(private platform: Platform,
                private statusBar: StatusBar,
                private splashScreen: SplashScreen,
                private keyboard: Keyboard,
                private deeplinks: Deeplinks,
                private userService: UserService,
                private authenticationService: AuthenticationService,
                private menuCtrl: MenuController,
                public events: Events,
                public notificationService: NotificationProvider,
                private translate: TranslateService) {

        this.translate.setDefaultLang('en');
        this.translate.use('it');

        if (this.authenticationService.isLoggedIn()) {
            this.userService
                .getUserProfile()
                .then((response: any) => {
                    if (response.success && response.profile) {
                        if (this.userService.isCourier(response.profile)) {
                            this.authenticationService.switchToCourier(response.profile);
                            this.nav.push('HomeCourierTabs');
                        } else {
                            this.authenticationService.switchToCustomer();
                            this.nav.push('HomeTabs');
                        }
                    }
                })
        }

        this.platform.ready().then(() => {
            try {
                this.notificationService
                    .init(onNotificationReceived => {
                        console.log("notify arrived");
                    }, onNotificationOpened => {
                        console.log("notify opened");
                    });
            } catch (e) {
                console.log('notification plugin not initialized')
                console.log(e);
            }
        });


        events.subscribe('user:login', () => {
            this.initProfile()
                .then((response: any) => {
                    if (response.success) {
                        if (this.userService.isCourier(this.profile)) {
                            this.switchRole(ROLES.COURIER);
                            this.nav.push('HomeCourierTabs');
                        } else {
                            this.nav.push('HomeTabs');
                        }
                    }
                });
        });
        events.subscribe('user:logout', () => {
            this.profile = null;
        });
    }

    deepLinkCatch() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.keyboard.disableScroll(true);
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.deeplinks.routeWithNavController(this.nav, {
                '/signup/:activationKey': 'RegistrationPage'
            }).subscribe((match: any) => {
                if (this.platform.is('android')) {
                    if (match.$link.path.startsWith("/signup")) {
                        let activationKey = match.$link.path.split("/")[2];
                        this.authenticationService
                            .verifySignup(activationKey)
                            .then(response => {
                                if (response.success) {
                                    this.profile = response.profile;
                                    this.nav.push('RegistrationPage',
                                        {
                                            activationKey: activationKey,
                                            profile: this.profile
                                        });
                                } else {
                                    console.log(response);
                                    this.gotoLinkExpired();
                                }
                            })
                            .catch(error => {
                                console.log(error);
                                this.gotoLinkExpired();
                            });
                    }
                }
                if (this.platform.is('ios')) {
                    if (match.$link.path.startsWith("/signup")) {
                        let activationKey = match.$link.path.split("/")[2];
                        this.authenticationService
                            .verifySignup(activationKey)
                            .then(response => {
                                if (response.success) {
                                    this.profile = response.profile;
                                    this.nav.push('RegistrationPage',
                                        {
                                            activationKey: activationKey,
                                            profile: this.profile
                                        });
                                } else {
                                    console.log(response);
                                    this.gotoLinkExpired();
                                }
                            })
                            .catch(error => {
                                console.log(error);
                                this.gotoLinkExpired();
                            });
                    }
                }
            }, (nomatch) => {
                // nomatch.$link - the full link data
                console.error('Got a deeplink that didn\'t match', nomatch);
            });
        });
    }

    ngAfterViewInit() {
        this.initProfile()
            .then((response) => {
                return this.deepLinkCatch();
            })
            .catch((error) => {
                return this.deepLinkCatch();
            });
    }

    navToPage(page) {
        this.nav.push(page);
        this.menuCtrl.close();
    }

    navToHome() {
        if (this.isCourier()) {
            this.nav.push('HomeCourierTabs');
            this.nav.setRoot('HomeCourierTabs');
        }
        if (this.isCustomer()) {
            this.nav.push('HomeTabs');
            this.nav.setRoot('HomeTabs');
        }
        this.menuCtrl.close();
    }

    isCourier() {
        return this.userService.isLoggedAsCourier();
    }

    isCustomer() {
        return this.userService.isLoggedAsCustomer();
    }

    canSwitchRole() {
        if (this.profile) {
            return this.userService.isCourier(this.profile);
        }
        return false;
    }

    switchRole(role) {
        if (ROLES.COURIER === role) {
            this.authenticationService.switchToCourier(this.profile);
            this.nav.push('HomeCourierTabs');
            this.nav.setRoot('HomeCourierTabs');
        }
        if (ROLES.CUSTOMER === role) {
            this.authenticationService.switchToCustomer();
            this.nav.push('HomeTabs');
            this.nav.setRoot('HomeTabs');
        }
    }

    initProfile() {
        return this.userService
            .getUserProfile()
            .then((response: any) => {
                if (response.success && response.profile) {
                    this.profile = response.profile;
                    //init user notificationProvider
                    this.notificationService
                        .getPlayerId()
                        .then((playerId) => {
                            this.playerId = playerId;
                            this.userService.updatePlayerId(this.playerId)
                                .then((playerId) => {
                                    console.log("success init user notification provider" + playerId);
                                })
                                .catch((error) => {
                                    console.log("error init user notification provider");
                                });
                        });
                }
                return response
            })
            .catch(error => {
                if (error.status == 401) {
                    this.nav.push("StartPage");
                }
            });
    }

    gotoLinkExpired() {
        let index = this.nav.getActive().index;
        this.nav.push('LinkExpiredPage').then(
            () => {
                this.nav.remove(index);
            });
    }
}

