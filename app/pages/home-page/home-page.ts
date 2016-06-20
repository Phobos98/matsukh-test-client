import {Component} from '@angular/core';
import {NavController, Loading, Alert} from 'ionic-angular';
import {Network, Connection} from 'ionic-native';

import {HttpClient} from '../../services/http';

@Component({
  templateUrl: 'build/pages/home-page/home-page.html'
})
export class HomePage {

  private _connected:boolean = false;
  private _serverAvailable:boolean = false;

  private _messages:Array<any> = [];

  constructor(private _nav: NavController, private _http: HttpClient) {

    let connectionLoading = Loading.create({
      content: 'Очікування підключення...'
    });

    this._nav.present(connectionLoading);

    let connectSubscription = Network.onConnect().subscribe(() => {
      connectionLoading.dismiss();
      connectionLoading.dismiss();
      console.warn('network connected');
      if (Network.connection === Connection.WIFI) {
        console.warn('connection is wifi');
        this._connected = true;
        this._loadMessages();
      }
    });

  }

  refresh(refresher:any) {
    this._loadMessages(refresher);
  }

  _loadMessages(refresher:any = null) {
    //this._connected = (Network.connection === Connection.WIFI);
    let connectionLoading = Loading.create({
      content: 'Підключення до сервера...'
    });
    this._nav.present(connectionLoading);
    this._http.get('/messages', null).subscribe(
      (data) => {
        connectionLoading.dismiss().then(() => {
          this._serverAvailable = true;
          this._messages = data.data.items;
          if (refresher) {
            refresher.complete();
          }
        } );
      },
      (err) => {
        connectionLoading.dismiss().then(() => {
          this._serverAvailable = false;
          if (refresher) {
            refresher.complete();
          }
        } );
      }
    );
  }

}
