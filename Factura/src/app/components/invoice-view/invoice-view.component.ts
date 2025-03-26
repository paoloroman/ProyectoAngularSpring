import { Component, Input } from '@angular/core';

@Component({
  selector: 'invoice-view',
  imports: [],
  templateUrl: './invoice-view.component.html'
})
export class InvoiceViewComponent {
//Recibe los datos del padre que es invoice
  @Input() nombre! : string ;
  @Input() id! : number;

}
