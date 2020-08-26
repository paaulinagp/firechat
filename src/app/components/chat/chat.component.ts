import { Component, OnInit } from '@angular/core';

import { ChatService } from '../../services/chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [],
})
export class ChatComponent implements OnInit {
  message: string;
  element: any;

  constructor(public chatService: ChatService) {
    this.message = '';

    this.chatService.uploadMessages().subscribe();
  }

  ngOnInit(): void {
    this.element = document.getElementById('app-mensajes');
  }

  sendMessage(): void {
    if (this.message.length === 0) {
      return;
    }

    this.chatService
      .addMessage(this.message)
      .then(() => {
        this.message = '';
        this.element.scrollTop = this.element.scrollHeight;
      })
      .catch((err) => {
        console.log('error: ', err);
      });
  }
}
