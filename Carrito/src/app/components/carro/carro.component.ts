import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemCarro } from '../../models/carro';

@Component({
  selector: 'carro',
  imports: [],
  templateUrl: './carro.component.html',
  styleUrl: './carro.component.css'
})
export class CarroComponent {

  @Input() items : ItemCarro[] = []; 

  @Output()  idProductoEmitido = new EventEmitter();

  eliminarItem(id:number){
    this.idProductoEmitido.emit(id);
  }
}
