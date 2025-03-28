import { Component } from '@angular/core';
import { Producto } from '../../models/producto';
import { TarjetasComponent } from '../tarjetas/tarjetas.component';
import { Router } from '@angular/router';
import { CompartirDataService } from '../../services/compartir-data.service';

@Component({
  selector: 'catalogo',
  imports: [
    TarjetasComponent
  ],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {

  productos! : Producto[];

 

  constructor (private router : Router, private compartirDataService : CompartirDataService){
    this.productos = this.router.getCurrentNavigation()?.extras.state!['productos'];
  }
  annadir(producto : Producto) : void{

    this.compartirDataService.productoEmitidoCatalogo.emit(producto);
  }
}
