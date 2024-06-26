import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
import { ForegroundService } from '@ionic-native/foreground-service/ngx';
import { TodoService } from '../services/todo.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { NotificationService } from '../services/notificaiton.service';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent  implements OnInit {

  constructor( private todoService:TodoService, public foregroundService: ForegroundService, private notificationService: NotificationService) {
   }

  ngOnInit() {
    // this.socket.connect();

    // this.socket.fromEvent("message").subscribe((data:any)=>{
    //   console.log(data);
    //   // alert("new event received");
    //   this.messages.push(data);
    //   this.SendNotification(data);
    // });
    // this.getApiMessage();
    this.startService();
  }

  startService() {
    // Notification importance is optional, the default is 1 - Low (no sound or vibration)
    this.foregroundService.start('Notify continue', 'Notifications will continue', 'drawable/fsicon');
   }

  socketConnected:boolean = true;

  messages:string[] = [];

  message:string="";

  sendMessage(){
    // this.socket.emit("message", this.message);
  }

  async SendNotification(m:string){
    let options:ScheduleOptions = {
      notifications:[
        {
          id:this.messages.length,
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

  getApiMessage(){
    this.todoService.getApi().subscribe(
      (res)=>{
        this.messages.push(res);
        this.SendNotification(res);
      },
      (err)=>{
        alert("somenthing went wrong");
      }
    );
  }


  //Bgmode and notification
  ngOnDesytoy(){
    this.notificationService.startNotifications();
  }
}
