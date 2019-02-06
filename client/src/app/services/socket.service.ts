import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable()
export class SocketService {

  public constructor(private socket: Socket) { }

  public join(room: string): Observable<string> {
    return new Observable(observer => {
      this.socket.emit('join', room);
      observer.next(room);
    });
  }

  public disconnect(): void {
    this.socket.disconnect();
  }
}
