import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Producto } from '../../models/producto';
import { TarjetasComponent } from '../tarjetas/tarjetas.component';

@Component({
  selector: 'catalogo',
  imports: [
    TarjetasComponent
  ],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {

  @Input() productosPadre! : Producto[];

  @Output() productoEmitidoCatalogo : EventEmitter<Producto> = new EventEmitter();

  annadir(producto : Producto) : void{

    this.productoEmitidoCatalogo.emit(producto);
  }
}
