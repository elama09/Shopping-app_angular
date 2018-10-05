import { Item } from './item';

export class Room {
    _id: string;
    name: string;
    items: Item[];
    create_date: Date;
}
