import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { TarjetasComponent } from '../tarjetas/tarjetas.component';
import { CompartirDataService } from '../../services/compartir-data.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'catalogo',
  imports: [
    TarjetasComponent
  ],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit{

  productos! : Producto[];

 

  constructor ( private compartirDataService : CompartirDataService,private productoService : ProductoService){}
  
  ngOnInit(): void {
    if(!this.productos){
      this.productos = this.productoService.findAll();
    }
  }
  annadir(producto : Producto) : void{

    this.compartirDataService.productoEmitidoCatalogo.emit(producto);
  }
}
