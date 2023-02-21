import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  // Local Testing
  // socket = io.connect("http://localhost:3001");

  // Server Testing
  socket = io.connect("https://berben-socketio.hiro-test.net/");

  constructor() { }

  connect() {
    this.socket.on('connect', () => {
      console.log('connected')
    });
  }

  sendRoomDetails(data: any) {
    let room_detail = {
      username: data.username,
      transaction: data.transaction
    }
    this.socket.emit("send_room_detail", room_detail);
  }

  receiveRoomDetails() {
    return new Observable<any>((observer: any) => {
      this.socket.on("room_detail", (data) => {
        let room_detail = {
          username: data.username,
          transaction: data.transaction,
          success: data.username != '' && data.transaction != '' ? true : false
        }
        observer.next(room_detail);
        observer.complete();
      });
    });
  }

  joinRoom(data: any) {
    if(data.username != '', data.transaction != '') {
      let room = {
        username: data.username,
        transaction: data.transaction
      }
      this.socket.emit("join_room", room);
    }
  }

  sendData(data: any) {
    if(data.weight) {
      this.socket.emit("send_data", data);
    }
  }

  sendSuccessMessage(data: any) {
    this.socket.emit("send_success_message", data);
  }

  receivedData(): Observable<any> {

    return new Observable<any>((observer: any) => {
      this.socket.on("receive_data", (data) => {

        if(data) {
          let reveiced_data = {
            username: data.username,
            transaction: data.transaction,
            weight: data.weight,
            success: data.success
          }
          observer.next(reveiced_data);
          observer.complete();
        }
      });
    });

  }

  // Receive Success Message
  receiveSuccessMessage(): Observable<any> {

    return new Observable<any>((observer: any) => {
      this.socket.on("success_messsage", (data) => {
        let success_data = {
          success: data.success,
          transaction: data.transaction
        }
        observer.next(success_data);
        observer.complete();
      });
    });

  }
}