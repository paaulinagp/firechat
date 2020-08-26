import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Message } from '../interfaces/message.interface';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Message>;
  chats: Message[] = [];

  constructor(private afs: AngularFirestore) {}

  uploadMessages(): Observable<Message[]> {
    this.itemsCollection = this.afs.collection<Message>('chats');
    return this.itemsCollection.valueChanges().pipe(
      map((messages: Message[]) => {
        this.chats = messages;
        return messages;
      })
    );
  }

  addMessage(text: string): Promise<any> {
    // TODO
    const message: Message = {
      userName: 'Paulina',
      message: text,
      date: new Date().getTime(),
    };
    return this.itemsCollection.add(message);
  }
}
