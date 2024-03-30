import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MessageComponent } from './message/message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForegroundService } from '@ionic-native/foreground-service/ngx';
import { TokenInterceptor } from './services/token.interceptor';
import { NotificationService } from './services/notificaiton.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';


const config: SocketIoConfig = {
  url: 'https://7d35-102-16-71-202.ngrok-free.app', options: {
    extraHeaders: {
      "ngrok-skip-browser-warning": "23456"
    }
  }
};

@NgModule({
  declarations: [AppComponent, MessageComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule,
    FormsModule, HttpClientModule,],
  providers: [
    NotificationService,
    BackgroundMode,
    ForegroundService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
