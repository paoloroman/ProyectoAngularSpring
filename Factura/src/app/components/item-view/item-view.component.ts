import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../models/item';

@Component({
  selector: 'item-view',
  imports: [],
  templateUrl: './item-view.component.html'
})
export class ItemViewComponent {
//Input porque proviene datos del padre invoice
@Input() items : Item[] = [];

//Con esto envio la informacionde hijo a padre 
@Output() eventoEliminar : EventEmitter<number> = new EventEmitter();

//Con este metodo elimino el item desde el hijo y lo emitira hasta el padre que se eliminara tambien
eliminarItem(id : number){

  this.eventoEliminar.emit(id);
  
}
}
