import { Component, OnInit } from '@angular/core';

import { ChatService } from '../../services/chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [],
})
export class ChatComponent implements OnInit {
  message: string;

  constructor(public chatService: ChatService) {
    this.message = '';

    this.chatService.uploadMessages().subscribe();
  }

  ngOnInit(): void {}

  sendMessage(): void {
    console.log('Enviando mensaje: ', this.message);
    if (this.message.length === 0) {
      return;
    }

    this.chatService
      .addMessage(this.message)
      .then(() => {
        this.message = '';
        console.log('Mensaje enviado');
      })
      .catch((err) => {
        console.log('error: ', err);
      });
  }
}
