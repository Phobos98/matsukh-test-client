import {Component} from '@angular/core';
import {NavController, Platform, Loading, Alert} from 'ionic-angular';
import {Network, Connection} from 'ionic-native';

import {HttpClient} from '../../services/http';

@Component({
  templateUrl: 'build/pages/home-page/home-page.html'
})
export class HomePage {

  private _connected:boolean = true;
  private _serverAvailable:boolean = false;

  private _messages:Array<any> = [];

  constructor(private _nav: NavController, private _http: HttpClient, private platform: Platform) {

    let connectionLoading = Loading.create({
      content: 'Перевірка підключення...'
    });

    this._nav.present(connectionLoading);

    platform.ready().then(() => {
      console.warn('platform.ready');
      console.warn(Network.connection, Connection.WIFI);
      connectionLoading.dismiss();
      this._loadMessages();
      let connectSubscription = Network.onConnect().subscribe(() => {
        console.warn('network connected');
        if (Network.connection === Connection.WIFI) {
          console.warn('connection is wifi');
          this._connected = true;
          this._loadMessages();
        }
      });
    });

  }

  _loadMessages() {
    let connectionLoading = Loading.create({
      content: 'Підключення до сервера...'
    });
    this._nav.present(connectionLoading);
    this._http.get('/messages', null).subscribe(
      (data) => { connectionLoading.dismiss().then( () => { this._serverAvailable = true; this._messages = data.data.items } ); },
      (err) => { connectionLoading.dismiss().then( () => { this._serverAvailable = false; } ); }
    );
  }

}
