import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError, interval, switchMap } from 'rxjs';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient, private backgroundMode: BackgroundMode) { }
  
  startNotifications() {
    // Activer le mode background
    this.backgroundMode.enable();
    let id:number = 1;
    // Boucle d'envoi des notifications toutes les 10 secondes
    setInterval(() => {
      this.SendNotification("Background mode Message number: "+ id, id);
      id++;
    }, 10000);
  }

  
  async SendNotification(m:string, id:number){
    let options:ScheduleOptions = {
      notifications:[
        {
          id:id,
          title:"New Error",
          body:m,
          largeBody:"",
          summaryText:m
        }
      ]
    }
    try {
      await LocalNotifications.schedule(options);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  }


  // Handle Error
  private handleError(error: HttpErrorResponse) {
    // return an observable with a user friendly message
    return throwError(error);
  }
}
