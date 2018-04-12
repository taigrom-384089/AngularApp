import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavMenuComponent } from './components/controls/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/controls/fetchdata/fetchdata.component';
import { CounterComponent } from './components/controls/counter/counter.component';

import { AuthService } from './services/auth.service';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthService
    ]
})
export class AppRoutingModule {
}
