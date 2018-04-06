import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './components/app/app.component';

@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        ServerModule,
        AppRoutingModule
    ]
})
export class AppModule {
}
