
export let comprobacionFinanciamieno = false;
export let plazo_meses               = 0;
export let pd_financiamiento         = 0;
export let pd_pago_anuales           = 0;
export let tasa_interes              = 0;
export let name_cliente;
export let clave_p;
export let stringDolar        = "";
export let margenReal         = "";
export var totalPropuesta     = "";
export let costosIndirectos = [];
let valorDolar      = 1;
let summm           = 0;
let precio3         = 0;
let precio2         = 0;

/*============= Porcentajes Costos Indirectos Default ===============================*/
let decimal                         = 3;
export let tMensual                 =0;
export let tMensualIVA              =0;
export let tMensualSUMA             =0;
export let totD                     = 0;
export let totDIVA                  = 0;
export var totMensual               =  "" ;
export var mesesMensual             = "";
export var totalMen                 = "";
export var totalMenIva              = "";
export var totalsnIVA               = "";
export let equivale                 = [];
export let totalMensual        = [];
export let financiamiento      = [];
export let desFabrica          = [];
export let margenGanancia      = [];
export let Cantidad            = [];
export let descuentoCliente    = [];
export let datosCompletosAM    = [];
export let datosCompletosTotal = [];
let data                       = [];
let data2                      = [];
let data3                      = [];
let dataCategoria              = [];
let monedaAM                   = [];
let sumatoriaMXN2 = 0;
let sumatoriaUSD2 = 0;
let totalBom = 0;

/*============= Eliminar Valores Repetidos ===============================*/

export let partidasUnicas       = [];
export let categoriasUnicas     = [];
export let descripcionGeneral   = [];
export let partidasUnicas2      = [];
export let descripcionGeneral2  = [];

//Datos Partida
export let totalMXN      = [];
export let totalUSD      = [];
//DATOS Categoria
export let totalMXN2     = [];
export let totalUSD2     = [];
// Moneda Unificada Categoria USD
export let totalCategoriasUSD       = [];
export let totalCategoriasUSD2      = [];

let contador = 0;
let sumatoriaMXN = 0;
let sumatoriaUSD = 0;

export let monedaPTN = [];
export let monedaPTN2 = [];

export let monedaPTN3 = [];
export let prov = [];

export let costoPTN = [];

export let totalIndirecto = [];
export let listaProv = [];
let totallistaprov = 0;

export let precioVenta = [];

let totalPrecioVenta = 0;
let totalprov = 0;
let totalCostoPTN = 0;

export let margenDirecto = [];

let toIndirecto = 0;
let calculaIndirecto = 0;
export let costoSinIndirectos = 0;
export let costoFianalProyecto = 0;
export let precioFinalVenta = 0;
export let totalMensualFinal = 0;


export let precioVenta3 = [];
export let precioVenta2 = [];
export let proporcional = [];
export let proporcionalMesaAyuda = [];
export let TOTAL = [];

export let TOTALSTRING = [];

export let TOTALSTRINGMENSUAL = [];


export let totalCategorias = 0;


export let financiamientoDescripcion = [];



export let totalMensualFinanciamiento = [];
export let TotalFinanciamiento= [];


export let dataExcel = [];



export function limpiaDatos() {

  clave_p ="";
  totalMensualFinal = 0;
  comprobacionFinanciamieno = false; 
  tMensual =0;
  tMensualIVA =0;
  tMensualSUMA =0;
  totalMensualFinanciamiento = [];
  TotalFinanciamiento= [];
  totD  = 0;
  totDIVA = 0;
  totMensual =  "" ;
  mesesMensual = "";
  totalMen = "";
  totalMenIva = "";
  totalsnIVA = "";
  TOTALSTRING = [];
  TOTALSTRINGMENSUAL = [];
  financiamiento = [];
  plazo_meses = 0;
  pd_financiamiento = 0;
  pd_pago_anuales = 0;
  tasa_interes = 0;
  name_cliente = "";
  costosIndirectos = [];
  equivale = [];
  totalMensual = [];
  desFabrica = [];
  margenGanancia = [];
  Cantidad = [];
  descuentoCliente = [];
  datosCompletosAM = [];
  datosCompletosTotal = [];
  sumatoriaMXN2 = 0;
  sumatoriaUSD2 = 0;
  totalBom = 0;
  data = [];
  data2 = [];
  data3 = [];
  dataCategoria = [];
  monedaAM = [];
  /*============= Eliminar Valores Repetidos ===============================*/
  partidasUnicas = [];
  categoriasUnicas = [];
  descripcionGeneral = [];
  partidasUnicas2 = [];
  descripcionGeneral2 = [];
  //Datos Partida
  totalMXN = [];
  totalUSD = [];
  //DATOS Categoria
  totalMXN2 = [];
  totalUSD2 = [];
  // Moneda Unificada Categoria USD
  totalCategoriasUSD = [];
  contador = 0;
  sumatoriaMXN = 0;
  sumatoriaUSD = 0;
  monedaPTN = [];
  monedaPTN2 = [];
  monedaPTN3 = [];
  prov = [];
  costoPTN = [];
  totalIndirecto = [];
  listaProv = [];
  totallistaprov = 0;
  precioVenta = [];
  totalPrecioVenta = 0;
  totalprov = 0;
  totalCostoPTN = 0;
  margenDirecto = [];
  toIndirecto = 0;
  calculaIndirecto = 0;
  costoSinIndirectos = 0;
  costoFianalProyecto = 0;
  precioFinalVenta = 0;
  margenReal = 0;
  precioVenta2 = [];
  proporcional = [];
  proporcionalMesaAyuda = [];
  TOTAL = [];
  totalCategorias = 0;
  Cantidad = [];
  precioVenta3 = [];
  summm = 0;
  pd_financiamiento = 0;
  pd_pago_anuales = 0;
  tasa_interes = 0;
  precio3 = 0;
  precio2 = 0;
  stringDolar = "";
  totalPropuesta = "";
  dataExcel = "";
  
}

let conversion = "";

export function obtenPartidasUnicas(
  datosPTN = [],
  categoriasPTN = [],
  Dolar = [],
  costosIndi = [],
  dataPorcentajes = [],
  dataPorcentajesC = [],
  dataFinancia = []

) 

{


 
  limpiaDatos();



  /* ANALIZAR TIPO DE DIVISA */
  if (Dolar.length != 0) {
    if (Dolar[0].proyecto_id_moneda === 1) {

      conversion = "MXN";
      stringDolar = "MXN";

      valorDolar = Dolar[0].proyecto_valor_dolar;
      plazo_meses = Dolar[0].proyecto_plazo_meses;


      if(  plazo_meses != 0 ){
        comprobacionFinanciamieno = true; 
      }else{
        comprobacionFinanciamieno = false; 
      }




      name_cliente = Dolar[0].nombre_cliente;
      clave_p = Dolar[0].proyecto_clave;
/*       console.log('Clave del proyecto - Archivo Operaciones AM:',clave_p)
      console.log('Cliente - Archivo Operaciones AM:',name_cliente) */

    } else if (Dolar[0].proyecto_id_moneda === 2) {
    

      
      conversion = "USD";
      stringDolar = "USD";
      valorDolar = Dolar[0].proyecto_valor_dolar;

      plazo_meses = Dolar[0].proyecto_plazo_meses;
      
      name_cliente = Dolar[0].nombre_cliente;
      clave_p = Dolar[0].proyecto_clave;
/*       console.log('Clave del proyecto - Archivo Operaciones AM:',clave_p)
      console.log('Cliente - Archivo Operaciones AM:',name_cliente) */






      plazo_meses = Dolar[0].proyecto_plazo_meses;



/*       console.log( plazo_meses  ,"HOLALKALJALKJSLK") */
      if(  plazo_meses != 0 ){
        comprobacionFinanciamieno = true; 
      }else{
        comprobacionFinanciamieno = false; 
      }







    }
  }

  ///DATOS FINANCIAMIENTO

  if (dataFinancia.length > 0) {
    pd_financiamiento = dataFinancia[0].pd_anio_financiamiento;
    pd_pago_anuales = dataFinancia[0].pd_pagos_anuales;
    tasa_interes = dataFinancia[0].pd_tasa_interes;
  }else{
    pd_financiamiento = 0;
    pd_pago_anuales = 0;
    tasa_interes = 0;
  }

  for (var i = 0; i < costosIndi.length; i++) {
    costosIndirectos.push(costosIndi[i].cci_nombre);
    equivale.push(costosIndi[i].ci_porcentaje);
  }

  /// Llenar Arreglo Porcentajes Partidas

  for (var i = 0; i < dataPorcentajes.length; i++) {
    margenGanancia.push(dataPorcentajes[i].am_margen_ganancia);
    descuentoCliente.push(dataPorcentajes[i].am_desc_cliente);
    Cantidad.push(dataPorcentajes[i].am_cantidad);
    desFabrica.push(dataPorcentajes[i].am_descuento_fabrica);
  }

  /// Llenar Arreglo Porcentajes Categorias

  for (var i = 0; i < dataPorcentajesC.length; i++) {
    margenGanancia.push(dataPorcentajesC[i].amc_margen_ganancia);
    descuentoCliente.push(dataPorcentajesC[i].amc_desc_cliente);
    Cantidad.push(dataPorcentajesC[i].amc_cantidad);
    desFabrica.push(dataPorcentajesC[i].amc_desc_fabrica);
  }

  if (
    dataPorcentajesC.length == dataPorcentajesC.length &&
    dataPorcentajesC.length > 0
  ) {
    margenGanancia.push(0);
    descuentoCliente.push(0);
    Cantidad.push(1);
    desFabrica.push(0);
  }

  /*=============GUardar Datos para Comparar ===============================*/



  for (const value of datosPTN) {
    data.push(value.partida_nombre);
    data2.push(value.partida_descripcion);
  }

  for (const value of categoriasPTN) {
    dataCategoria.push(value.cat_nombre);
    monedaAM.push(value.precio_total);
  }

  /*============= Eliminar Valores Repetidos ===============================*/

  partidasUnicas = data.filter((valor, indice) => {
    return data.indexOf(valor) === indice;
  });
  descripcionGeneral = data2.filter((valor, indice) => {
    return data2.indexOf(valor) === indice;
  });
  partidasUnicas2 = data.filter((valor, indice) => {
    return data.indexOf(valor) === indice;
  });
  descripcionGeneral2 = data2.filter((valor, indice) => {
    return data2.indexOf(valor) === indice;
  });

  categoriasUnicas = dataCategoria.filter((valor, indice) => {
    return dataCategoria.indexOf(valor) === indice;
  });




  for (var i = 0; i < partidasUnicas.length; i++) {
    for (var j = 0; j < datosPTN.length; j++) {
      //Sumatoria por Partidas por Separado por Monedas

      if (partidasUnicas[i] === datosPTN[j].partida_nombre) {
   
        contador++;


        if (datosPTN[j].precio_id_moneda === 1) {
          sumatoriaMXN += datosPTN[j].precio_total;
        } else if (datosPTN[j].precio_id_moneda === 2) {
          sumatoriaUSD += datosPTN[j].precio_total;
        }
      } else {
        contador = 0;
      }
    }
    /*============= Guardar Sumatoria MXN USD  ===============================*/

    totalMXN.push(sumatoriaMXN);
    totalUSD.push(sumatoriaUSD);
    sumatoriaMXN = 0;
    sumatoriaUSD = 0;

  }
  //////// Conversion

  for (var i = 0; i < totalMXN.length; i++) {


    

    if (conversion === "MXN") {

   
      if (totalMXN[i] !== 0) {
     
        if(totalUSD[i] !==0   ){

          let a  = parseFloat(totalMXN[i]);
          let b = parseFloat(totalUSD[i] * valorDolar)

          let c = a+b;
          monedaPTN.push(c.toFixed(decimal));
          monedaPTN2.push(c.toFixed(decimal));
        }else{
          monedaPTN.push(totalMXN[i].toFixed(decimal) );
          monedaPTN2.push(totalMXN[i].toFixed(decimal));
        }

      } else {

           if(totalUSD[i] !==0   ){


            if (totalMXN[i] !== 0) {
              let a  = parseFloat(totalMXN[i]);
              let b = parseFloat(totalUSD[i] * valorDolar)

              let c = a+b;
              monedaPTN.push(c.toFixed(decimal) );
              monedaPTN2.push(c.toFixed(decimal));

              
            }else{

              let d = totalUSD[i] * valorDolar;
              monedaPTN.push(d.toFixed(decimal));
              monedaPTN2.push(d.toFixed(decimal));
            }


        }

   
      }

//CONVERSION A USD PARTIDAS

    } else if (conversion === "USD") {

   
      if (totalMXN[i] !== 0) {
     
        if(totalUSD[i] !==0   ){

          let a  = parseFloat(totalUSD[i]);
          let b = parseFloat(totalMXN[i] / valorDolar);

      /*     console.log(b , "nn");
          console.log("dolar  "  , valorDolar)
 */
          let c = a+b;
          monedaPTN.push(c.toFixed(decimal) );
          monedaPTN2.push(c.toFixed(decimal));

        }else{
        ///Arreglado codigo  
          let conversion = parseFloat(totalMXN[i] / valorDolar);
          monedaPTN.push(conversion.toFixed(decimal) );
          monedaPTN2.push(conversion.toFixed(decimal));



        }

      

      } else if(totalUSD[i] !==0   ){


            if (totalMXN[i] !== 0) {
              let a  = parseFloat(totalUSD[i]);
              let b = parseFloat(totalMXN[i] / valorDolar);

              let d = a+b;
              monedaPTN.push(d.toFixed(decimal) );
              monedaPTN2.push(d.toFixed(decimal));

              
            }else{
              monedaPTN.push(totalUSD[i].toFixed(decimal) );
              monedaPTN2.push(totalUSD[i].toFixed(decimal) );
            }

        }
      


    }
  }
/* Conversion de Moneda para categorias   */


  for (var i = 0; i < categoriasUnicas.length; i++) {
    for (var j = 0; j < categoriasPTN.length; j++) {
      //Sumatoria por Partidas por Separado por Monedas
      if (categoriasUnicas[i] === categoriasPTN[j].cat_nombre) {
        // console.log(datosPTN[j].nombrePartida, " = ", partidasUnicas[i]);
        contador++;
        if (categoriasPTN[j].moneda_nombre === "MXN") {
          sumatoriaMXN += categoriasPTN[j].precio_total;
        } else if (categoriasPTN[j].moneda_nombre === "USD") {
          sumatoriaUSD += categoriasPTN[j].precio_total;
        }
      } else {
        contador = 0;
      }
    }
    /*============= Guardar Sumatoria MXN USD  ===============================*/
    totalMXN2.push(sumatoriaMXN);
    totalUSD2.push(sumatoriaUSD);
    sumatoriaMXN = 0;
    sumatoriaUSD = 0;
  }

/*   console.log("-------------------");
  console.log(totalMXN2);
  console.log(totalUSD2);
  console.log("-------------------"); */

  /*============= Convertir a Una sola Moneda USD categoria ===============================*/

  for (var i = 0; i < totalMXN2.length; i++) {


  //MXN
    if (conversion === "MXN") {

      if (totalMXN2[i] !== 0) {
      /*   totalCategoriasUSD.push(totalMXN2[i].toFixed(decimal)); */
      if(totalUSD2[i] !==0   ){

        let a  = parseFloat(totalMXN2[i].toFixed(decimal));
        let b = parseFloat(totalUSD2[i].toFixed(decimal) * valorDolar)
        totalCategoriasUSD.push(a+b );
      }else{
        totalCategoriasUSD.push(totalMXN2[i].toFixed(decimal) );
     
      }

      }else if(totalUSD2[i] !==0 ){

          if (totalMXN2[i] !== 0) {
            let a  = parseFloat(totalMXN2[i].toFixed(decimal));
            let b = parseFloat(totalUSD2[i].toFixed(decimal) * valorDolar)
            totalCategoriasUSD.push(a+b );
               
          }else{
            totalCategoriasUSD.push(totalUSD2[i].toFixed(decimal) * valorDolar);
 
          }

      }
      } 
    
    
    
 ///USD   
    
    else if (conversion === "USD") {


      if (totalMXN2[i] !== 0) {

        if (totalUSD2[i] !== 0) {
          let a  = parseFloat(totalUSD2[i].toFixed(decimal));
          let b = parseFloat(totalMXN2[i] / valorDolar)
          totalCategoriasUSD.push(a+b );
 
        }else{

          let c = totalMXN2[i] / valorDolar;
          totalCategoriasUSD.push(c.toFixed(decimal));        
        }
      } 



     else  if (totalUSD2[i] !== 0) {
        if (totalMXN2[i] !== 0) {

          let a  = parseFloat(totalUSD2[i].toFixed(decimal));
          let b = parseFloat(totalMXN2[i].toFixed(decimal) / valorDolar)
          totalCategoriasUSD.push(a+b );
 
        }else{
          totalCategoriasUSD.push(totalUSD2[i].toFixed(decimal));        
        }
  

      } else {
        totalCategoriasUSD.push(totalUSD2[i].toFixed(decimal));
      }



      ///

   
    }

  }

















  totalCategoriasUSD2 = totalCategoriasUSD;
  sumatoriaMXN2 = 0;
  sumatoriaUSD2 = 0;
  concatenaDatos(
    partidasUnicas,
    categoriasUnicas,
    monedaPTN,
    totalCategoriasUSD
  );

  
  dataExcel=datosPTN;
  console.log("Data Operaciones" ,    dataExcel);



  return datosPTN;
}

function concatenaDatos(
  partidasUnicas = [],
  categoriasUnicas = [],
  monedaPTN = [],
  totalCategoriasUSD = []
) {
  datosCompletosAM = partidasUnicas;
  datosCompletosTotal = monedaPTN;

  datosCompletosAM = datosCompletosAM.concat(categoriasUnicas);
  datosCompletosTotal = datosCompletosTotal.concat(totalCategoriasUSD);

  datosCompletosAM.push(" Total ");
  let suma = 0;

  for (var i = 0; i < datosCompletosTotal.length; i++) {
    suma += parseFloat(datosCompletosTotal[i]);
  }

  datosCompletosTotal.push(suma.toFixed(decimal));
  suma = 0;
  /* console.log(datosCompletosAM);
console.log(datosCompletosTotal);
 */
  //Llenar Datos

  //data porcentajes
  /* for (var i = 0; i < datosCompletosTotal.length ; i++) {
    margenGanancia.push(32);
    descuentoCliente.push(0);
    Cantidad.push(1);
    desFabrica.push(0);
  } */

  prov = datosCompletosTotal;

  /*=============CHECAR Obtener Lista Prov ===============================*/

  totallistaprov = 0;

  let r = 0;
  for (var i = 0; i < prov.length - 1; i++) {
    listaProv.push((prov[i] * Cantidad[i]).toFixed(decimal));

    r += parseFloat((prov[i] * Cantidad[i]).toFixed(decimal));
  }

  listaProv.push(r.toFixed(decimal));
  r = 0;

  //COSTO PTN

  let sumT =0;

  for (var i = 0; i < listaProv.length-1; i++) {
    let m = 1 - desFabrica[i] / 100;
    let x = listaProv[i] * m;

    sumT += x;
    costoPTN.push(x.toFixed(decimal));
  }
  costoPTN.push(sumT.toFixed(decimal));

  sumT =0;

  precio3 = costoPTN[costoPTN.length - 1];
  costoSinIndirectos = precio3;

  /*============= Obtener Lista Prov ===============================*/

  /*============= Obtener Totales ccc===============================*/

  for (var i = 0; i < datosCompletosTotal.length - 1; i++) {
    //Solucion
    totalPrecioVenta += parseFloat(datosCompletosTotal[i]);
    totallistaprov += parseFloat(listaProv[i]);
    totalprov += parseFloat(prov[i]);
    // totalCostoPTN += parseFloat(costoPTN[i]);
  }

  calcularPrecioVenta();
  return partidasUnicas;
}

let sumP = 0;
function calcularPrecioVenta() {
  /*============= Calcular Precio Venta ===============================*/

  for (var i = 0; i < datosCompletosTotal.length - 1; i++) {
    var x = (datosCompletosTotal[i] * (100 - descuentoCliente[i])) / 100;
    var k = (100 - margenGanancia[i]) / 100;
    var z = x / k;
    /*============= Dejar Solo 3 Digitos despues del punto ===============================*/
  
    z = z*Cantidad[i];
    sumP += parseFloat(z);
    precioVenta.push(z.toFixed(decimal));


  }

  precioVenta.push(sumP.toFixed(decimal));
  sumP = 0;



  //Calcular Margen Directo

  for (var i = 0; i < datosCompletosTotal.length - 1; i++) {
    var c = 1 - costoPTN[i] / precioVenta[i];
    c = c * 100;
    c = Math.round(c);
    margenDirecto.push(c);
  }

  // Costos Indirectos
  let precio = precioVenta[precioVenta.length - 1];
  precioFinalVenta = precio;

  /* console.log("precio  ",  precio) */

  costosIndirectos.push("Total");
let su = 0;
  for (var i = 0; i < costosIndirectos.length - 1; i++) {
    calculaIndirecto = ((equivale[i] / 100) * precio);
    totalIndirecto.push(calculaIndirecto.toFixed(decimal));

    su += calculaIndirecto ;
  }

  totalIndirecto.push(su.toFixed(decimal));
  su=0;

  precio2 = totalIndirecto[totalIndirecto.length - 1];

  costoFianalProyecto = parseFloat(precio3) + parseFloat(precio2);
  costoFianalProyecto = costoFianalProyecto.toFixed(decimal);

  margenReal = (((1 - costoFianalProyecto / precioFinalVenta) * 100 ).toFixed(decimal));

  final();
}

function final() {
  partidasUnicas.push("Total ");
  /*============= Precio Venta 2 Proporcionalmente ===============================*/
  var sumatoria = 0;
  for (var i = 0; i < partidasUnicas.length - 1; i++) {
    var x = (monedaPTN[i] * (100 - descuentoCliente[i])) / 100;
    var k = (100 - margenGanancia[i]) / 100;
    var z = x / k;
    sumatoria += z;
    z = z *Cantidad[i];
    precioVenta2.push(z.toFixed(decimal));
  }
  precioVenta2.push(sumatoria.toFixed(decimal));
  sumatoria = 0;

  let final3 = precioVenta2.length - 1;
  var prop2 = 0;

  for (var i = 0; i < precioVenta2.length - 1; i++) {
    var prop = precioVenta2[i] / precioVenta2[final3];
    prop = prop * 100;
    prop2 += prop;
    proporcional.push(prop.toFixed(decimal));
  }
  proporcional.push(prop2.toFixed(decimal));
  prop2 = 0;

  /*============= Obtener Total Categorias ===============================*/

  for (var i = partidasUnicas.length - 1; i < precioVenta.length - 1; i++) {
    // console.log(precioVenta[i]);
    totalCategorias += parseFloat(precioVenta[i]);
  }
  //  console.log("Total Categorias",  totalCategorias )

  for (var i = 0; i < partidasUnicas.length; i++) {
    var tot = totalCategorias * (proporcional[i] / 100);
    proporcionalMesaAyuda.push(tot.toFixed(decimal));
  }

  var h = 0;
  /*============= Proporcional Mesa De Ayuda ===============================*/
  for (var i = 0; i < partidasUnicas.length; i++) {
    h = parseFloat(proporcionalMesaAyuda[i]) + parseFloat(precioVenta2[i]);
    h = h.toFixed(decimal);
    TOTAL.push(h);
 
 
  }


  var g = 0;
  for (var i = 0; i <TOTAL.length; i++) {


    g =  " $ " + TOTAL[i];
    let a = parseFloat(TOTAL[i]) / plazo_meses;

    
    TOTALSTRINGMENSUAL.push(a.toFixed(decimal));
    TOTALSTRING.push(g);
 
 
  }

  
     totD  =  TOTAL[TOTAL.length-1];
     let tiD =    (parseFloat(totD)  * .16);

     totDIVA = tiD.toFixed(decimal) ;
  


    tMensual = parseFloat(totD)  / plazo_meses ;
    tMensual =  tMensual.toFixed(decimal);
   
    tMensualIVA =  (  tMensual  * .16);
    tMensualIVA  =    tMensualIVA.toFixed(decimal);

    let tm= parseFloat( tMensual )  +    parseFloat(tMensualIVA) ;
    tMensualSUMA =   tm.toFixed(decimal) ;
    let ttt = parseFloat(totD) +   parseFloat(totDIVA) ;
    totalsnIVA  = ttt.toFixed(decimal) ;





  
  //bien 4

  /*============= Financiamiento ===============================*/
  let a = 0;
  // n =  Años de financiamiento
  let n = pd_financiamiento;
  // Pagos Anuales default
  let m = pd_pago_anuales;
  // ti = Tasa Interes
  let ti = tasa_interes;

  for (var i = 0; i < TOTAL.length; i++) {
    // tasa %
    // pago = meses
    // valor actual = precio total venta
    //futuro = 0
    // co = Monto  precio de venta
    let co = TOTAL[i];
    // Tipo de interés fraccionado (del periodo)
    let im = ti / m / 100;
    let im2 = Math.pow(1 + im, -(m * n));
    // Cuota Cap. + Int.
    a = (co * im) / (1 - im2);
    //console.log("Cuota Cap + Int: " + a.toFixed(3));


    if (comprobacionFinanciamieno == false){
      financiamiento.push("No Aplica");
    } else if (comprobacionFinanciamieno == true){
      financiamiento.push(a.toFixed(decimal));
    }
   
  }

  /*============= Total Mensual===============================*/

  for (var i = 0; i < TOTAL.length; i++) {
   let  j = TOTAL[i] / plazo_meses;

    if (comprobacionFinanciamieno == false){
      totalMensual.push("No Aplica");
    }else{

     totalMensual.push(j.toFixed(decimal)); 
    }

  }

  categoriasUnicas.push(" Total ");

  let cos = 0;

  for (var i = 0; i < totalCategoriasUSD2.length; i++) {
    cos += parseFloat(totalCategoriasUSD2[i]);
  }
  totalCategoriasUSD2.push(cos.toFixed(decimal));
  cos = 0;

  /////////Categorias Proporcionalidad

  for (
    var i = partidasUnicas.length - 1;
    i < datosCompletosAM.length - 1;
    i++
  ) {
    precioVenta3.push(precioVenta[i]);

    summm += parseFloat(precioVenta[i]);
  }

  precioVenta3.push(summm.toFixed(decimal));

  summm = 0;
  ///console.log("cccc  ", totalCategoriasUSD2);



  totMensual = totalMensual[totalMensual.length-1];

  totalMensualFinal =totalMensual[totalMensual.length-1];
  mesesMensual = " " +  plazo_meses;
  totalMen =   (totalMensual[totalMensual.length-1] * 12);
   let cx =  (totalMensual[totalMensual.length-1] * 12) *  .16;
   let cz =   (totalMensual[totalMensual.length-1] * 12) + cx;
   cz = cz.toFixed(decimal);


  totalMenIva =  cz;



 
}
