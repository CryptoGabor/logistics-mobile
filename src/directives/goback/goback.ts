import { Directive } from '@angular/core';
import { NavController } from "ionic-angular";

/**
 * Generated class for the GobackDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[goback]', // Attribute selector
  host: {
    '(click)': 'goBack($event)'
  }
})
export class GobackDirective {

  constructor(private navCtrl: NavController) {
  }

  goBack(e){
    if(this.navCtrl.canGoBack()) {
        this.navCtrl.pop()
    }
  }

}
