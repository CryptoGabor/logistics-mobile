import {Directive} from "@angular/core";
import {AuthenticationService} from "../../services/restAPI/authentication.service";
import {Events} from "ionic-angular";

@Directive({
    selector: '[logout]', // Attribute selector
    host: {
        '(click)': 'logout($event)'
    }
})
export class LogoutDirective {


    constructor(public events: Events,
                private authenticationService: AuthenticationService) {
    }

    logout(e) {
        this.authenticationService.logout();
        this.events.publish("user:logout");
    }

}
