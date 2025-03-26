import { Component, Input } from '@angular/core';
import { Item } from '../../models/item';

@Component({
  selector: 'item-view',
  imports: [],
  templateUrl: './item-view.component.html',
  styleUrl: './item-view.component.css'
})
export class ItemViewComponent {
//Input porque proviene datos del padre invoice
@Input() items : Item[] = [];
}
