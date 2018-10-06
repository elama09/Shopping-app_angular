import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs-compat';
import { catchError, tap, map } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { Item } from '../classes/item';
import { Room } from '../classes/room';
import { Observable, of, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  room: Room;
  items: Item[];

  constructor(private http: Http, private error: ErrorService,
    private httpclient: HttpClient) { }

  // NEW
  getTokenFromServer2<T>(roomname: string, pin: string): Observable<T> {
    return this.httpclient.get<T>(`http://localhost:3000/api/token/${roomname}/${pin}`)
    .pipe(tap(
      token => console.log(`Got token from server: ${token}`)),
      catchError(err => {
        return throwError('Error in fetching data from server');
      }));
  }

  getTokenFromServer(roomname: string, pin: string) {
    return this.http.get(`http://localhost:3000/api/token/${roomname}/${pin}`)
      .map(res => {
        return res.json();
      });
  }

  // NEW
  getRoom2(roomname: string): Observable<Room> {
    return this.httpclient.get<Room>('http://localhost:3000/api/rooms/' + roomname)
      .pipe(
        tap(ro => {console.log(`Fetching room (${roomname}) from server: ${ro}`);
      }),
      catchError(err => {
        return throwError(`Error in fetching data from server: ${err}`);
      })
      );
  }

  getRoom(roomname: string) {
    return this.http.get('http://localhost:3000/api/rooms/' + roomname)
      .map(res => {
        if (res.json().length === 0) {
          return res.json();
        } else {
          this.room = res.json()[0];
          this.items = this.room.items;
          console.log(this.items);
          console.log(this.room);
          return res.json();
        }
      });
  }

  // NEW
  searchRoom2(roomname: string): Observable<Room> {
    return this.httpclient.get<Room>('http://localhost:3000/api/rooms/' + roomname)
    .pipe(
      tap(ro => console.log(`Searching room... ${ro}`)),
      catchError(err => {
        return throwError(`Error in finding room: ${err}`);
      })
    );
  }

  searchRoom(roomname: string) {
    return this.http.get('http://localhost:3000/api/rooms/' + roomname)
      .map(res => {
        return res.json();
      });
  }

  // NEW
  createNewRoom2(roomname: string): Observable<Room> {
    const room = { name: roomname };
    const headerOptions = {headers: new HttpHeaders({'Content-Type':  'application/json'})};
    return this.httpclient.post<Room>(`http://localhost:3000/api/rooms`, room, headerOptions)
      .pipe(
        tap(ro => console.log(`Creating new room to server: ${{ro}}`)),
        catchError(err => {
          return throwError(`Error in creating room: ${err}`);
        })
      );
  }

  createNewRoom(roomname: string) {
    const header = new Headers();
    header.set('Content-Type', 'application/json');
    const room = { name: roomname };
    return this.http.post(`http://localhost:3000/api/rooms`, room, { headers: header })
      .map(res => {
        return res.json();
      });
    // .subscribe(res => console.log(res));
  }

  addItemToRoom(item: Item, roomname: string) {
    const header = new Headers();
    header.set('Content-Type', 'application/json');
    this.http.post(`http://localhost:3000/api/rooms/${roomname}/items`, item, { headers: header })
      .subscribe(res => console.log(res));
  }

  deleteItemFromRoom(item: Item) {
    this.http.delete(`http://localhost:3000/api/rooms/${item.room}/items/${item._id}`)
      .subscribe(res => console.log(res));
  }

  changeItemStatus(item: Item) {
    const header = new Headers();
    header.set('Content-Type', 'application/json');
    this.http.put(`http://localhost:3000/api/rooms/${item.room}/items/${item._id}`, item, { headers: header })
      .subscribe(res => console.log(res));
  }
}
