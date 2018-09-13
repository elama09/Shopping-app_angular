import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import 'rxjs-compat';
import { catchError } from 'rxjs/operators';
import {ErrorService} from './error.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  room: object;
  items: object[];

  constructor(private http: Http, private error: ErrorService) { }

  getTokenFromServer(roomname: string, pin: string) {
    return this.http.get(`http://localhost:3000/api/token/${roomname}/${pin}`)
    .map(res => {
      return res.json();
    });
  }

  getRoom(roomname: string) {
    return this.http.get('http://localhost:3000/api/rooms/' + roomname)
    .map(res => {
      this.room = res.json()[0];
      this.items = this.room.items;
      console.log(this.items);
      console.log(this.room);
      return res.json();
    });
  }

  searchRoom(roomname: string) {
    return this.http.get('http://localhost:3000/api/rooms/' + roomname)
    .map(res => {
      return res.json();
    });
  }

  createNewRoom(roomname: string) {
    const header = new Headers();
    header.set('Content-Type', 'application/json');
    const room = {name: roomname};
    return this.http.post(`http://localhost:3000/api/rooms`, room, {headers: header})
    .map(res => {
      return res.json();
    });
    // .subscribe(res => console.log(res));
  }

  addItemToRoom(item: object, roomname: string) {
    const header = new Headers();
    header.set('Content-Type', 'application/json');
    this.http.post(`http://localhost:3000/api/rooms/${roomname}/items`, item, {headers: header})
    .subscribe(res => console.log(res));
  }

  deleteItemFromRoom(item: object) {
    this.http.delete(`http://localhost:3000/api/rooms/${item.room}/items/${item._id}`)
    .subscribe(res => console.log(res));
  }

  changeItemStatus(item: object) {
    const header = new Headers();
    header.set('Content-Type', 'application/json');
    this.http.put(`http://localhost:3000/api/rooms/${item.room}/items/${item._id}`, item, {headers: header})
    .subscribe(res => console.log(res));
  }
}
