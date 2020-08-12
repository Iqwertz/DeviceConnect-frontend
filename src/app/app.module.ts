import { ConnectService } from './services/connect.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { LandingComponent } from './pages/landing/landing.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, LandingComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    FormsModule,
    HttpClientModule,
  ],
  providers: [ConnectService],
  bootstrap: [AppComponent],
})
export class AppModule {}
