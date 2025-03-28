import { Component, Input } from '@angular/core';
import { ItemCarro } from '../../models/carro';
import { RouterModule } from '@angular/router';
import { Producto } from '../../models/producto';

@Component({
  selector: 'navBar',
  imports: [
    RouterModule
  ],
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {

  @Input() items : ItemCarro[] = [];

  @Input() total : number = 0;

  @Input() productos : Producto[] = []; 
  
}
