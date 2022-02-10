import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {LocationStrategy, HashLocationStrategy, registerLocaleData} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {ModalModule} from 'ngx-bootstrap/modal';
import {IconModule, IconSetModule, IconSetService} from '@coreui/icons-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

import {AppComponent} from './app.component';

// Import containers
import {DefaultLayoutComponent} from './containers';

import {P404Component} from './views/error/404.component';
import {P500Component} from './views/error/500.component';
import {LoginComponent} from './views/login/login.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
const APP_CONTAINERS = [DefaultLayoutComponent];

import {AppAsideModule, AppBreadcrumbModule, AppHeaderModule, AppFooterModule, AppSidebarModule} from '@coreui/angular';

// Import routing module
import {AppRoutingModule} from './app.routing';

// Import 3rd party components
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ChartsModule} from 'ng2-charts';
import {AuthInterceptor} from './intherceptor/auth.interceptor';
import {SharedModule} from './views/shared/shared.module';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');
@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AppAsideModule,
        AppBreadcrumbModule.forRoot(),
        AppFooterModule,
        AppHeaderModule,
        AppSidebarModule,
        PerfectScrollbarModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        ChartsModule,
        IconModule,
        IconSetModule.forRoot(),
        ModalModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        MatSliderModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        HttpClientModule,
        SharedModule
    ],
    declarations: [AppComponent, ...APP_CONTAINERS, P404Component, P500Component, LoginComponent],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        IconSetService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {provide: LOCALE_ID, useValue: 'fr' }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
