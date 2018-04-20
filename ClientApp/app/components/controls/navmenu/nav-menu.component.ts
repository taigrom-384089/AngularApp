import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import { Router, NavigationStart } from '@angular/router';

import { AppTitleService } from '../../../services/app-title.service';
import { AuthService } from '../../../services/auth.service';
import { AccountService } from '../../../services/account.service';
import { AppComponent } from "../../../components/app.component";
import { Permission } from '../../../models/permission.model';

@Component({
    selector: 'nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, AfterViewInit {

    appTitle = "AngularApp";
    appLogo = require("../../../assets/images/logo.png");

    @Input()
    isUserLoggedIn: boolean;

    @Input()
    userName: string;

    constructor (public parent: AppComponent, public router: Router, private appTitleService: AppTitleService, private authService: AuthService, private accountService: AccountService) {
        this.appTitleService.appName = this.appTitle;
    }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                let url = (<NavigationStart>event).url;

                if (url !== url.toLowerCase()) {
                    this.router.navigateByUrl((<NavigationStart>event).url.toLowerCase());
                }
            }
        });
    }

    ngAfterViewInit() {

    }

    logout() {
        this.authService.logout();
        this.authService.redirectLogoutUser();
    }

    get canViewCustomers() {
        return this.accountService.userHasPermission(Permission.viewUsersPermission); //eg. viewCustomersPermission
    }

}