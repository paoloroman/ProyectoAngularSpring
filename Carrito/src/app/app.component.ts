import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarritoCompraComponent } from './components/carrito-compra/carrito-compra.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
  CarritoCompraComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Carrito';
}
