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

  public emit(event: string, data?: any): void {
    // temporary solution
    console.group();
    console.log('----- SOCKET OUTGOING -----');
    console.log('Action: ', event);
    console.log('Payload: ', data);
    console.groupEnd();

    this.socket.emit(event, data);
  }
}
