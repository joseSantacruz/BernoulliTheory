import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private translate: TranslateService) {
        translate.addLangs(['es', 'en']);
        translate.setDefaultLang('es');

        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/es|en/) ? browserLang : 'es');
    }

}

