import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  roomname: string;
  pin: string;
  foundRoom: object;
  notFoundOrWrongPin = false;
  logged = false;
  newRoomname: string;
  newRoomExists = false;
  newRoomCreated = false;
  newRoomPin: string;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.roomname = 'Testi1Huone';
    this.pin = '5b8f806c776b53eab3bd7852';
  }

  onLogin() {
    console.log(this.roomname);
    console.log(this.pin);
    this.dataService.getRoom(this.roomname).subscribe(room => {
      console.log(room);
      if (room.length === 0 || room[0]._id !== this.pin) {
        // Tell error, room not found or wrong pin
        this.notFoundOrWrongPin = true;
        setTimeout(() => {
          this.notFoundOrWrongPin = false;
        }, 1200);
      } else {
        // Get Token from server AND Room OK!
        this.foundRoom = room[0];
        this.dataService.getTokenFromServer(room[0].name, room[0]._id)
          .subscribe(token => {
            console.log(token);
            sessionStorage.setItem('token', `Bearer ${token.token}`);
            this.router.navigateByUrl(`/rooms/${this.roomname}`);
          });
      }
    });
  }

  onCreateRoom() {
    if (this.newRoomname.length < 4) {
      alert('Name too short! Must be minimum of 3 characters.');
      return;
    }

    this.dataService.searchRoom(this.newRoomname).subscribe(found => {
      if (found.length) {
        // Room found
        this.newRoomExists = !this.newRoomExists;
        setTimeout(() => {
          this.newRoomExists = !this.newRoomExists;
        }, 1500);
      } else {
        this.dataService.createNewRoom(this.newRoomname).subscribe(data => {
          this.newRoomPin = data._id;
          this.newRoomCreated = true;
        });
      }
    });
  }

}
