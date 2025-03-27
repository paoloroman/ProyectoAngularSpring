import { Component, OnInit, Output } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { CatalogoComponent } from '../catalogo/catalogo.component';
import { CarroComponent } from '../carro/carro.component';
import { ItemCarro } from '../../models/carro';

@Component({
  selector: 'carrito-compra',
  imports: [
    CatalogoComponent,
    CarroComponent
  ],
  templateUrl: './carrito-compra.component.html',
  styleUrl: './carrito-compra.component.css'
})
export class CarritoCompraComponent implements OnInit {

  productos: Producto[] = [];

  items: ItemCarro[] = [];
  constructor(private servicio: ProductoService) { }

  ngOnInit(): void {
    this.productos = this.servicio.findAll();
  }

  annadirACarro(producto: Producto): void {
    const idAux = this.items.find(item => {
      return item.producto.id === producto.id;
    });
    if (idAux) {
      //Hacemos un map para ver si el id del producto es lo mismo que el id del producto que pasamos si es correcto le añadimos a la cantidad + 1 para que no se repita en el carrito toda la descripcion
      //devuleve los items del array pero modificado
      this.items = this.items.map(item => {
        if (item.producto.id === producto.id) {
          return {
            ...item, cantidad: item.cantidad + 1
          }
        }
        return item;
      });
    } else {
      this.items = [... this.items, { producto: { ...producto }, cantidad: 1 }]; //clonamos el objeto con ... 
    }
  }

  eliminarProducto(id : number) : void{
    this.items = this.items.filter(item =>item.producto.id !== id); // si es distinto crea un nuevo array y si es el mismo id no lo pione en el array 
  }

}
