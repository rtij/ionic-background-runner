import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MessageComponent } from './message/message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const config: SocketIoConfig = { url: 'https://bd03-102-16-180-147.ngrok-free.app', options: {} };

@NgModule({
  declarations: [AppComponent, MessageComponent],
  imports: [BrowserModule, IonicModule.forRoot(), SocketIoModule.forRoot(config), AppRoutingModule, ReactiveFormsModule,
    FormsModule, HttpClientModule,],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
