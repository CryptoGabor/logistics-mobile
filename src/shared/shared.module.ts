import {NgModule} from '@angular/core';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../app/app.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
    imports: [
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        })
    ],
    exports: [
        TranslateModule
    ]
})
export class SharedModule {
}
