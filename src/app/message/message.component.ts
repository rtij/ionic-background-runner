import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
import { TodoService } from '../services/todo.service';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent  implements OnInit {

  constructor(private socket:Socket, private todoService:TodoService) { }

  ngOnInit() {
    this.socket.connect();

    this.socket.on("chan-indicator",function (client:Socket){
      client.fromEvent("Indicator").subscribe(
        (res)=>{
          console.log(res);
        }
      )
    });
    // ("chan-indicator:IndicatorEvent").subscribe((data:any)=>{
    //   console.log(data);
    //   alert("new event received");
    //   this.messages.push(data);
    //   // this.SendNotification(data);
    // });
    this.getApiMessage();
  }

  socketConnected:boolean = true;

  messages:string[] = [];

  message:string="";

  sendMessage(){
    this.socket.emit("message", this.message);
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
      },
      (err)=>{
        alert("somenthing went wrong");
      }
    )
  }

}
