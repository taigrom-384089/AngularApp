import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import { Router, NavigationStart } from '@angular/router';

import { AppTitleService } from '../../../services/app-title.service';
import { AuthService } from '../../../services/auth.service';
import { AccountService } from '../../../services/account.service';
import { AppComponent } from "../../../components/app.component";
import { Permission } from '../../../models/permission.model';
import { AlertService, AlertDialog, DialogType, AlertMessage, MessageSeverity } from '../../../services/alert.service';
import { NotificationService } from "../../../services/notification.service";
import { AppTranslationService } from "../../../services/app-translation.service";

@Component({
    selector: 'nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, AfterViewInit {

    newNotificationCount = 0;
    appTitle = "AngularApp";
    appLogo = require("../../../assets/images/logo.png");
    gT = (key: string, params?: object) => this.translationService.getTranslation(key, params);

    @Input()
    isUserLoggedIn: boolean;

    @Input()
    userName: string;

    get notificationsTitle() {

        if (this.newNotificationCount)
            return `${this.gT("app.Notifications")} (${this.newNotificationCount} ${this.gT("app.New")})`;
        else
            return this.gT("app.Notifications");
    }

    constructor (public parent: AppComponent, public router: Router, private appTitleService: AppTitleService, private authService: AuthService, private accountService: AccountService, private alertService: AlertService, 
        private notificationService: NotificationService, private translationService: AppTranslationService) {
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

    markNotificationsAsRead() {

        let recentNotifications = this.notificationService.recentNotifications;

        if (recentNotifications.length) {
            this.notificationService.readUnreadNotification(recentNotifications.map(n => n.id), true)
                .subscribe(response => {
                    for (let n of recentNotifications) {
                        n.isRead = true;
                    }

                    this.newNotificationCount = recentNotifications.filter(n => !n.isRead).length;
                },
                error => {
                    this.alertService.logError(error);
                    this.alertService.showMessage("Notification Error", "Marking read notifications failed", MessageSeverity.error);

                });
        }
    }
}