import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { PopupType } from '../../../shared/components/popup/popup.component';

export interface PopupNotification {
  id: number;
  type: PopupType;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private onNotify = new Subject<Omit<PopupNotification, 'id'>>();

  private notifications$: Observable<PopupNotification[]>;

  private nextId = 0;

  constructor() {
    this.notifications$ = this.onNotify.pipe(
      scan<Omit<PopupNotification, 'id'>, PopupNotification[]>((acc, { type, message }) => {
        const id = this.nextId++;
        return [...acc, { id, type, message }];
      }, [])
    );
  }

  notify(type: PopupType, message: string) {
    this.onNotify.next({ type, message });
  }

  getNotifications(): Observable<PopupNotification[]> {
    return this.notifications$;
  }
}
