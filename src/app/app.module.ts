import { AppState } from './store/app.state';
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
import { SessionComponent } from './pages/session/session.component';
import { SessionMessagesComponent } from './components/session-messages/session-messages.component';
import { SessionMessagesTextFieldComponent } from './components/session-messages-text-field/session-messages-text-field.component';
import { JoinSessionComponent } from './components/join-session/join-session.component';
import { CreateSessionComponent } from './components/create-session/create-session.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SessionmenuComponent } from './components/sessionmenu/sessionmenu.component';
import { SafePipe } from './pipes/safe.pipe';
import { UseralertComponent } from './components/useralert/useralert.component';
import { SearchMessagesComponent } from './components/search-messages/search-messages.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SessionComponent,
    SessionMessagesComponent,
    SessionMessagesTextFieldComponent,
    JoinSessionComponent,
    CreateSessionComponent,
    SessionmenuComponent,
    SafePipe,
    UseralertComponent,
    SearchMessagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxsModule.forRoot([AppState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [ConnectService],
  bootstrap: [AppComponent],
})
export class AppModule {}
