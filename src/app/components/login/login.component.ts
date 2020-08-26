import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  constructor(public chatService: ChatService) {}

  ngOnInit(): void {}

  login(type: string): void {
    this.chatService.login();
  }
}
