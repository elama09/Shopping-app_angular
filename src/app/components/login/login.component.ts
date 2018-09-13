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
  logged: boolean = false;

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
      if (room.length === 0) {
        // Tell error, room not found or wrong pin
      } else if (room[0]._id !== this.pin) {
        // Tell error, wrong pin
      } else {
        // Get Token from server
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

}
