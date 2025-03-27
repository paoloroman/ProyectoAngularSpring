import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Producto } from '../../models/producto';

@Component({
  selector: 'tarjetas',
  imports: [],
  templateUrl: './tarjetas.component.html',
  styleUrl: './tarjetas.component.css'
})
export class TarjetasComponent {

  @Input() producto! : Producto;

  @Output() productoEmitido : EventEmitter<Producto> = new EventEmitter();
  
  annadirCarro(producto : Producto) : void{

    this.productoEmitido.emit(producto);

  }
}
