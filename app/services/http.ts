import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Device} from 'ionic-native';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HttpClient {

  private _apiUrl:string = 'http://localhost:3000/api/v1';
  private _clientSecret:string = '5ebe2294ecd0e0f08eab7690d2a6ee69';
  private _clientID:string = 'ee11cbb19052e40b07aac0ca060c23ee';

  constructor(private _http: Http) {
    console.warn(Device.device);
  }

  get(url:string, options:any) {
    return this._http.get(this._apiUrl + url, this._resolveOptions(options))
      .share()
      .map((res) => {
        return this._bindResponse(res);
      })
      .catch((err) => {
        return Observable.throw(err.json());
      });
  }

  post(url:string, data:any, options:any) {
    return this._http.post(this._apiUrl + url, JSON.stringify(data), this._resolveOptions(options))
      .share()
      .map((res) => {
        return this._bindResponse(res);
      })
      .catch((err) => {
        return Observable.throw(err.json());
      });
  }

  patch(url:string, data:any, options:any) {
    return this._http.patch(this._apiUrl + url, JSON.stringify(data), this._resolveOptions(options))
      .share()
      .map((res) => {
        return this._bindResponse(res);
      })
      .catch((err) => {
        return Observable.throw(err.json());
      });
  }

  put(url:string, data:any, options:any) {
    return this._http.put(this._apiUrl + url, JSON.stringify(data), this._resolveOptions(options))
      .share()
      .map((res) => {
        return this._bindResponse(res);
      })
      .catch((err) => {
        return Observable.throw(err.json());
      });
  }

  delete(url:string, options:any) {
    return this._http.delete(this._apiUrl + url, this._resolveOptions(options))
      .share()
      .map((res) => {
        return this._bindResponse(res);
      })
      .catch((err) => {
        return Observable.throw(err.json());
      });
  }

  _bindResponse(res:any) {
    return { data: res.json(), headers: res.headers };
  }

  _resolveOptions(options:any) {
    options = options || {};
    if (!options.headers) {
      options.headers = new Headers();
    }
    this._setDeviceHeaders(options.headers);
    this._setBasciAuthHeaders(options.headers);
    return options;
  }

  _setDeviceHeaders(headers:Headers) {
    let device = Device.device;
    console.warn(device, device.model);
    headers.set('X-Device-Model', device.model);
    headers.set('X-Device-Platform', device.platform);
    headers.set('X-Device-UUID', device.uuid);
    headers.set('X-Device-Version', device.version);
    headers.set('X-Device-Manufacturer', device.manufacturer);
    headers.set('X-Device-Serial', device.serial);
    headers.set('Content-Type', 'application/json');
  }

  _setBasciAuthHeaders(headers:Headers) {
    headers.set('Authorization', 'Basic ' + btoa(this._clientID + ':' + this._clientSecret));
  }


}