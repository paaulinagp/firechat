import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Message } from '../interfaces/message.interface';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Message>;
  user: any = {};
  chats: Message[] = [];

  constructor(private afs: AngularFirestore, public auth: AngularFireAuth) {
    this.auth.authState.subscribe((user) => {
      console.log(user);
      if (!user) {
        return;
      }
      this.user.name = user.displayName;
      this.user.uid = user.uid;
    });
  }

  uploadMessages(): Observable<Message[]> {
    this.itemsCollection = this.afs.collection<Message>('chats', (ref) =>
      ref.orderBy('date', 'desc').limit(5)
    );
    return this.itemsCollection.valueChanges().pipe(
      map((messages: Message[]) => {
        this.chats = messages;
        this.chats = this.chats.sort((chat1: any, chat2: any) => {
          return chat1.date - chat2.date;
        });
        return messages;
      })
    );
  }

  addMessage(text: string): Promise<any> {
    // TODO
    const message: Message = {
      userName: this.user.name,
      message: text,
      date: new Date().getTime(),
      uid: this.user.uid,
    };
    return this.itemsCollection.add(message);
  }

  login(provider: string): void {
    if (provider === 'google') {
      this.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } else {
      this.auth.signInWithPopup(new auth.TwitterAuthProvider());
    }
  }

  logout(): void {
    this.user = {};
    this.auth.signOut();
  }
}
