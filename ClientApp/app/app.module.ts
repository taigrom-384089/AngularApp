import { NgModule, ErrorHandler } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import 'bootstrap';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastyModule } from 'ng2-toasty';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { PopoverModule } from "ngx-bootstrap/popover";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app.routing.module';
import { AppErrorHandler } from './app.error.handler';
import { AlertService } from './services/alert.service';
import { LocalStoreManager } from './services/local-store-manager.service';
import { NotificationService } from './services/notification.service';
import { NotificationEndpoint } from './services/endpoint/notification-endpoint.service';
import { AppTitleService } from './services/app-title.service';
import { AppTranslationService, TranslateLanguageLoader } from './services/app-translation.service';
import { ConfigurationService } from './services/configuration.service';
import { AccountService } from './services/account.service';
import { AccountEndpoint } from './services/endpoint/account-endpoint.service';
import { EndpointFactory } from './services/endpoint/endpoint-factory.service';

import { AppComponent } from './components/app.component';
import { LoginComponent } from "./components/login/login.component";
import { NavMenuComponent } from './components/controls/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/controls/fetchdata/fetchdata.component';
import { CounterComponent } from './components/controls/counter/counter.component';

import { NotificationsViewerComponent } from "./components/controls/notification/notifications-viewer.component";

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        FormsModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: TranslateLanguageLoader
            }
        }),
        NgxDatatableModule,
        ToastyModule.forRoot(),
        TooltipModule.forRoot(),
        PopoverModule.forRoot(),
        BsDropdownModule.forRoot(),
        CarouselModule.forRoot(),
        ModalModule.forRoot(),
        ChartsModule
    ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        FetchDataComponent,
        CounterComponent,
        LoginComponent,
        NotificationsViewerComponent
    ],
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        { provide: ErrorHandler, useClass: AppErrorHandler },
        AlertService,
        LocalStoreManager,
        NotificationService,
        NotificationEndpoint,
        ConfigurationService,
        AppTitleService,
        AppTranslationService,
        AccountService,
        AccountEndpoint,
        EndpointFactory
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
