import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavMenuComponent } from './components/controls/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/controls/fetchdata/fetchdata.component';
import { CounterComponent } from './components/controls/counter/counter.component';
import { LoginComponent } from "./components/login/login.component";
import { SettingsComponent } from "./components/settings/settings.component";

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
            { path: 'counter', component: CounterComponent, canActivate: [AuthGuard] },
            { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthGuard] },
            { path: "login", component: LoginComponent, data: { title: "Login" } },
            { path: "settings", component: SettingsComponent, canActivate: [AuthGuard], data: { title: "Settings" } },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthService, AuthGuard
    ]
})
export class AppRoutingModule {
}
