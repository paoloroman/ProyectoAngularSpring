import { Injectable } from '@angular/core';
import { Factura } from '../models/factura';
import { facturaData } from '../data/factura.data';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private factura: Factura = facturaData;

  constructor() { }

  getFactura(): Factura {
    const total  = this.calcularTotal();
    return {... this.factura, total}; // el ... es para clonar la instancia factura en otro objeto
  }

  calcularTotal(): number {
    let total = 0;

    //Recorremos los items para calcular el total
    this.factura.items.forEach(item => {
      total += item.total(); //un metodo del modelo 
    });

    return total;

    //Tambien se podria usar reduce 
    //return this.factura.itenms.reduce((acumulador, item => acumulador + item.total(), 0)) el 0 es el valor principal del acumulador
    // es un metodo que se usa en los arrays para reducir sus elementos en un unico valor, acumulando los resultados a traves de una función
  }

}
