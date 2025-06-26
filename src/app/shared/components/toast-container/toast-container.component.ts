import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService, PopupNotification } from '../../../core/services/popup/notification.service';
import { PopupComponent } from "../popup/popup.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast-container',
  imports: [
    PopupComponent, 
    CommonModule
  ],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.scss'
})
export class ToastContainerComponent implements OnInit {
   notifications: PopupNotification[] = [];
  sub!: Subscription;

  constructor(private svc: NotificationService) {}

  ngOnInit() {
    this.sub = this.svc.getNotifications().subscribe(ns => this.notifications = ns);
  }

  remove(id: number) {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

}
