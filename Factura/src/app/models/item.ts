export class Item {
    id!: number;
    producto!: string;
    precio!: number;
    cantidad!: number;

    total(): number {
        let total = this.precio * this.cantidad;

        return total;
    }

    
}