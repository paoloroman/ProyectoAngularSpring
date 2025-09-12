import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import {  productosEmulados } from '../data/productosEmulados.data';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor() { }

  findAll() : Producto[]{
    return productosEmulados;
  }
}
