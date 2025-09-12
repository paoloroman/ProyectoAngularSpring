import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompartirDataService {

  private _idProductoEmitido = new EventEmitter();

  private _productoEmitidoCatalogo = new EventEmitter();

  constructor() { }

  get idProductoEmitido(){
    return this._idProductoEmitido;
  }
  get productoEmitidoCatalogo(){
    return this._productoEmitidoCatalogo;
  }
}
