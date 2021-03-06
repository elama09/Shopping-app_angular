import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Item } from '../../classes/item';
import { Room } from '../../classes/room';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  room: Room;
  items: Item[];
  isAddItem = false;

  constructor(private dataService: DataService, private router: Router) {
    const token = sessionStorage.getItem('token');
    // if (!token) { this.router.navigateByUrl('/'); } Change this completely
  }

  ngOnInit() {
    this.room = this.dataService.room;
    this.items = this.dataService.items;
  }

  showNewItemForm() {
    this.isAddItem = !this.isAddItem;
  }

  exitRoom() {
    sessionStorage.removeItem('token');
    this.router.navigateByUrl(`/login`);
  }

  addItem(name: string, brand: string, quantity: number, unit: string) {
    const newItem: Item = {
      name, brand, qty: quantity, unit
    };
    console.log(newItem);
    this.items.push(newItem);
    this.isAddItem = false;
    this.dataService.addItemToRoom(newItem, this.room.name);
  }

  deleteItem(item) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] === item) {
        this.items.splice(i, 1);
      }
    }
    this.dataService.deleteItemFromRoom(item);
  }

  changeItemStatus(item) {
    const tempItem: Item = Object.assign({}, item, { ready: !item.ready });
    this.dataService.changeItemStatus(tempItem);
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] === item) {
        this.items[i].ready = !this.items[i].ready;
      }
    }
  }

}
