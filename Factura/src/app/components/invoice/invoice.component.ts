import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../services/factura.service';
import { Factura } from '../../models/factura';
import { ClientViewComponent } from '../client-view/client-view.component';
import { CompanniaViewComponent } from '../compannia-view/compannia-view.component';
import { ItemViewComponent } from '../item-view/item-view.component';
import { InvoiceViewComponent } from '../invoice-view/invoice-view.component';
import { TotalComponent } from '../total/total.component';

@Component({
  selector: 'app-invoice',
  imports: [
    ClientViewComponent,
    CompanniaViewComponent,
    ItemViewComponent,
    InvoiceViewComponent,
    TotalComponent],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit {

  factura! : Factura;

  constructor(private service : FacturaService){ }

  ngOnInit(): void {

    this.factura = this.service.getFactura();
    
  }

  //una vez eliminado en el hijo en este caso item-view lo debemos eliminar del padre para que se elimine totalmente
  eliminarItem(id : number){

    this.factura = this.service.eliminar(id);

  }
}
