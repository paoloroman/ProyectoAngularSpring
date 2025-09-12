import { Component, EventEmitter, Output } from '@angular/core';
import { Item } from '../../models/item';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'form-view',
  imports: [FormsModule],
  templateUrl: './form-view.component.html',
  styleUrl: './form-view.component.css'
})
export class FormViewComponent {

  @Output() addItemEvent: EventEmitter<Item> = new EventEmitter();

  private contadorId: number = 5;

  item: any = {
    producto: '',
    precio: '',
    cantidad: ''
  };

  enviarDatos(formulario : NgForm): void {
    if(formulario.valid){
      this.addItemEvent.emit({ id: this.contadorId, ... this.item });
      this.contadorId++;
      this.item = {
        producto: '',
        precio: '',
        cantidad: ''
      }

      //Reseteamos el formulario para que no aparezcan los errores 
      formulario.reset();
      formulario.resetForm();
    }
  }
}
