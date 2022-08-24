
let Descuento = 0;
let pUnitario =0;
let decimal = 3;

/*=== Calcular precioUnitario  con precioLista y Descuento ===*/
function limpiar(){
    Descuento = 0;
    pUnitario = 0;
}
export function precioUnitario(precioLista, Descuento) {

    limpiar();
    pUnitario = parseFloat(( parseFloat(precioLista) *  parseFloat(Descuento)) / 100);
    pUnitario = precioLista - pUnitario;
    pUnitario =   pUnitario.toFixed(decimal);
    return pUnitario;

 
}

function oprop (props){
let a = props.canti * props.canti2;
}


/*=== Calcular Descuento  con precioLista y precioUnitario ===*/

export function calcularDescuento(precioLista, precioUnitario) {
    limpiar();
       Descuento = parseFloat(100 - ( parseFloat(precioUnitario) * 100) /  parseFloat(precioLista));

    Descuento = Descuento.toFixed(decimal)
            return Descuento;

}




/*=== Calcular Total  con  precioUnitario y Cantidad ===*/

export function Total(precioUnitario, Cantidad) {
    let Total= parseFloat(Cantidad * precioUnitario);
    Total = Total.toFixed(3);
    return Total;
}


