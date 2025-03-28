import { Component, OnInit, Output } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { ItemCarro } from '../../models/carro';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';
import { CompartirDataService } from '../../services/compartir-data.service';

@Component({
  selector: 'carrito-compra',
  imports: [
    NavBarComponent,
    RouterOutlet
],
  templateUrl: './carrito-compra.component.html',
  styleUrl: './carrito-compra.component.css'
})
export class CarritoCompraComponent implements OnInit {

  productos: Producto[] = [];

  items: ItemCarro[] = [];

  total: number = 0;


  constructor(private servicio: ProductoService , private compartirDataService : CompartirDataService) { }

  ngOnInit(): void {
    this.productos = this.servicio.findAll();
    this.items = JSON.parse(sessionStorage.getItem('carrito') || '[]') ; 
    this.calcularTotal();
    this.annadirACarro();
    this.eliminarProducto();
  }

  annadirACarro(): void {
    this.compartirDataService.productoEmitidoCatalogo.subscribe(producto =>{
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
      this.calcularTotal();
      this.guardarSesion();
    });
    
  }

  eliminarProducto(): void {
    this.compartirDataService.idProductoEmitido.subscribe(id =>{
      console.log(id+' Se ha ejecutado el compartirDataService') ;
      this.items = this.items.filter(item => item.producto.id !== id); // si es distinto crea un nuevo array y si es el mismo id no lo pione en el array 
      this.calcularTotal();
      this.guardarSesion();
    })
   
  }

  calcularTotal(): void {
    this.total = this.items.reduce((totalReduce, item) => totalReduce + (item.cantidad * item.producto.precio), 0); // el reduce lo uso para sumar todos los items en una sola línea hay que pasar 2 argumentos para hacer una expresion landa del calculo que corresponda y dar el valor 0 porque comienza en 0 
    this.guardarSesion();
  }


  guardarSesion(): void {
    sessionStorage.setItem('carrito', JSON.stringify(this.items));
  }



}
