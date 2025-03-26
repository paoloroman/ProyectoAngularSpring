import { Cliente } from "./cliente";
import { Compannia } from "./compannia";
import { Item } from "./item";

export class Factura {
   id!: number;
   nombre!: string;
   cliente!: Cliente;
   compannia!: Compannia;
   items!: Item[];
   total! : number;
}