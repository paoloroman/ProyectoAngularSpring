import { Component, Input } from '@angular/core';
import { Compannia } from '../../models/compannia';

@Component({
  selector: 'compannia-view',
  imports: [],
  templateUrl: './compannia-view.component.html',
  styleUrl: './compannia-view.component.css'
})
export class CompanniaViewComponent {
//Input porque cojo el dato del padre que es invoice 

@Input() compannia : Compannia = new Compannia();
}
