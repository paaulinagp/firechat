import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [],
})
export class ChatComponent implements OnInit {
  message: string = '';
  constructor() {}

  ngOnInit(): void {}
  sendMessage(): void {
    console.log('Enviando mensaje: ', this.message);
  }
}
