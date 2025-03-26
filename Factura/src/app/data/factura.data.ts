import { Factura } from "../models/factura";

export const facturaData : Factura = {
    id: 1,
    nombre: 'Componentes de PC',
    cliente: {
        nombre: 'Andrea',
        apellido: 'Diaz',
        direccion : {
            pais: 'UK',
            ciudad: 'London',
            calle: 'One Street',
            numero: 23
        }
    },
        compannia: {
            nombre: 'New Age',
            numeroFiscal: 19822232
        },
        items: [
            {
             id : 1,
             producto : 'CPU Intel i9',
             precio : 600,
             cantidad : 45   
            },
            {
             id : 2,
             producto : 'Logitec Mouse',
             precio : 40,
             cantidad : 30   
            },
            {
                id : 3,
                producto : 'Logitec Keyboard',
                precio : 90,
                cantidad : 35   
               },
               {
                id : 4,
                producto : 'Monitor Philips',
                precio : 280,
                cantidad : 90   
               }
        ]
    }
