import { Component, EventEmitter } from '@angular/core';
import { ItemCarro } from '../../models/carro';
import { Router } from '@angular/router';
import { CompartirDataService } from '../../services/compartir-data.service';

@Component({
  selector: 'carro',
  imports: [],
  templateUrl: './carro.component.html',
  styleUrl: './carro.component.css'
})
export class CarroComponent {

  items : ItemCarro[] = []; 


  total : number = 0;

  constructor(private router : Router , private CompartirDataService : CompartirDataService){
    this.items = this.router.getCurrentNavigation()?.extras.state!['items'];
    this.total = this.router.getCurrentNavigation()?.extras.state!['total'];
  }

  eliminarItem(id:number){
    this.CompartirDataService.idProductoEmitido.emit(id);
  }

  
}
