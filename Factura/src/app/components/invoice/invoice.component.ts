import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../services/factura.service';
import { Factura } from '../../models/factura';
import { ClientViewComponent } from '../client-view/client-view.component';
import { CompanniaViewComponent } from '../compannia-view/compannia-view.component';
import { ItemViewComponent } from '../item-view/item-view.component';
import { InvoiceViewComponent } from '../invoice-view/invoice-view.component';

@Component({
  selector: 'app-invoice',
  imports: [ClientViewComponent,CompanniaViewComponent,ItemViewComponent,InvoiceViewComponent],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit {

  factura! : Factura;

  constructor(private service : FacturaService){ }

  ngOnInit(): void {

    this.factura = this.service.getFactura();
    
  }

}
