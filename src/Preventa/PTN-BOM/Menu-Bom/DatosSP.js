/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import axios from 'axios';
import Cookies from "universal-cookie";
import { url, url2 } from "../../../Componentes/Ocultar";
import { pEstatus1 } from "./ContinuarProyecto";
/*============== Operacions PTN BOM ==============*/
import { precioUnitario, calcularDescuento, Total } from "../Operaciones/Operaciones";
import ModalPtnDatos from "../Routes/ModalPtnDatos";
import Animaciones from "../../../Componentes/Animaciones";
import { dataCategoria } from "../../../Ventas/Operaciones/totalPartida";
import { pId } from "../Routes/GuardarPartida";
import { pId2, hoy } from "./NuevoProyecto";



//Obtención del id del usuario con sesión activa
const cookies = new Cookies();
let validatorid = cookies.get('id_usuario');

let parId;
let validaOperacion = false;

export function getIdPar(partida_id) {
  parId = partida_id;
}


function DatosSP({ clave }) {
  /*========================== Mostrar/Ocultar ==========================*/
  const [show, setShow] = useState(true); //Menu SP
  /*=====================================================================*/
  const [Bdesc, setBdesc] = useState(true);
  const [Bdesc2, setBdesc2] = useState(false);

  function checa() {

    validaOperacion = !validaOperacion;
    setBdesc(!Bdesc);
    setBdesc2(!Bdesc2);
    setDatos({
      precio_lista: '',
      precio_unitario: '',
      precio_descuento: '',
      sp_cantidad: '',
      precio_total: '',
    });
  }
  //console.log(clave);

  const [modalShow, setModalShow] = useState(false);
  /*  console.log("---- Precio Unitario ----- ") */
  /*PARAMETROS   precioUnitario(precioLista, Descuento) */
  /*   console.log( precioUnitario( 100 , 10 ))
    console.log(" ------------- ") */

  /*   console.log("---- Calcular Descuento ----- ") */
  /*  /*PARAMETROS  calcularDescuento(precioLista, precioUnitario ) */
  /*   console.log( calcularDescuento( 100 , 10 )) */
  /*   console.log(" ------------- ") */

  /*   console.log("---- Calcular Total ----- ") */

  /*PARAMETROS  calcularDescuento(Cantidad , Precio Unitario); */
  /*  console.log( Total( 1 , 90 )) */
  /*   console.log(" ------------- ")
  
   */

  /*=================================== Obtención de datos en la tabla precio ===================================*/
  // Almacenamiento de los datos

  const [datos, setDatos] = useState({
    precio_lista: '',
    precio_unitario: '',
    precio_descuento: '',
    sp_cantidad: '',
    precio_total: '',
    precio_id_moneda: ''
  });

  const handleInputChange = (event) => {
    setDatos({
      ...datos, [event.target.name]: event.target.value,
    });
  };

  /*useEffect(() => {
    let total = '';
    let precio_u = '';
    let desc_ = '';
    if (datos.precio_unitario !== '' && datos.sp_cantidad !== '') {
      const total = Total(datos.precio_unitario, datos.sp_cantidad)
      setDatos({ ...datos, precio_total: total })
      const desc = calcularDescuento(datos.precio_lista, datos.precio_unitario);
      setDatos({ ...datos, precio_descuento: desc });
    }
    if (datos.precio_unitario == '' || datos.sp_cantidad =='') {
      setDatos({ ...datos, precio_total: total , precio_descuento:desc_ })
    }
    if (datos.precio_lista !== '' && datos.precio_descuento !== '' && datos.precio_unitario !== '') {
      precio_u = precioUnitario(datos.precio_lista, datos.precio_descuento);
      const total = Total(precio_u, datos.sp_cantidad);
      setDatos({ ...datos, precio_unitario: precio_u , precio_total:total});
    }
  },[datos.precio_unitario, datos.precio_lista, datos.precio_descuento, datos.sp_cantidad])*/

  ///CALCULAR DESCUENTO
  /*================================================================================*/
  useEffect(() => {

    if (datos.precio_lista !== '' && datos.precio_unitario !== '' && validaOperacion === false) {
      const desc = calcularDescuento(datos.precio_lista, datos.precio_unitario);
      const total = Total(datos.precio_unitario, datos.sp_cantidad)
      setDatos({ ...datos, precio_total: total, precio_descuento: desc });
    }

    if (datos.precio_lista === '' || datos.precio_unitario === '') {
      setDatos({ ...datos, precio_descuento: '' });
    }

  }, [datos.sp_cantidad, datos.precio_lista, datos.precio_unitario])


  ///CALCULAR PRECIO UNITARIO
  /*===================================================================================================================*/
  useEffect(() => {
    let precio_u = '';
    if (datos.precio_lista !== '' && datos.precio_descuento !== '' && validaOperacion === true) {
      precio_u = precioUnitario(datos.precio_lista, datos.precio_descuento);
      const total = Total(precio_u, datos.sp_cantidad);
      if (datos.precio_descuento < 0 || datos.precio_descuento > 100) {
        // alert("Advertencia Porcentaje Invalido")
      }
      setDatos({ ...datos, precio_total: total, precio_unitario: precio_u });
    }

  }, [datos.precio_descuento, datos.precio_lista, datos.sp_cantidad])

  //OBTENER TOTALES

  //checar
  /*===================================================================================================================*/
  useEffect(() => {

    if (datos.precio_unitario === '' || datos.sp_cantidad === '') {
      setDatos({ ...datos, precio_total: '' });
    }

  }, [, datos.precio_unitario, datos.sp_cantidad])

  /*===========================================================================*/

  /*=================================== Buscador de proveedores ===================================*/
  // Almacenamiento de los proveedores existentes
  const [ListaProv, setListaProv] = useState([]);

  // Almacenamiento del id del proveedor encontrado en la busqueda
  var proveedorId = { proveedor_id: '' }

  // Almacenamiento del nombre del proveedor a buscar
  const [nombreProv, setNombreProv] = useState('');

  // Almacenamiento de los proveedores semejantes al texto introducido en el input
  const [suggestionsProv, setSuggestionsProv] = useState([]);

  // Función que realiza la consulta a la tabla proveedores
  useEffect(() => {
    async function listaProvs() {
      try {
        const respuesta = await axios.get(url + "/api/cotizador/proveedor/view");
        setListaProv(respuesta.data.data);
      } catch (error) { }
    }
    listaProvs();
  }, [])

  // Función que realiza la busqueda de los clientes semejantes a al nombre introducido 
  const onChangeTextProv = (nombreProveedor) => {
    let coincidencias = [];
    if (nombreProveedor.length > 0) {
      coincidencias = ListaProv.filter(proveedor => {
        const regex = new RegExp(`${nombreProveedor}`, "gi");
        return proveedor.proveedor_nombre.match(regex)
      })
    }
    setSuggestionsProv(coincidencias);
    setNombreProv(nombreProveedor);
  }

  // Función que obtiene el nombre del cliente seleccionado
  const onSuggestHandlerProv = (nombreProveedor) => {
    setNombreProv(nombreProveedor);
    setSuggestionsProv([]);
  }
  /*============================================================================================*/

  /*=================================== Buscador de marcas con respecto al proveedor seleccionado ===================================*/
  // Almacenamiento de los proveedores existentes
  const [listaMarca, setListaMarca] = useState([]);

  // Almacenamiento del id del proveedor encontrado en la busqueda
  var marcaId = { marca_id: '' }

  // Almacenamiento del nombre del proveedor a buscar
  const [nombreMarca, setNombreMarca] = useState('');

  // Almacenamiento de los proveedores semejantes al texto introducido en el input
  const [suggestionsMarca, setSuggestionsMarca] = useState([]);

  // Función que realiza la consulta a la tabla proveedores
  useEffect(() => {
    // Obtención del id del proveedor que se seleccionó en la búsqueda
    let i = Object.keys(ListaProv);
    for (let c = 0; c < i.length; c++) {
      if (nombreProv === ListaProv[c].proveedor_nombre) {
        proveedorId.proveedor_id = ListaProv[c].proveedor_id
        //console.log('proveedor id:',proveedorId);
      }
    }
    async function listaMarcas() {
      try {
        const respuesta = await axios.get(url2 + `/api/cotizador/provmarcas/view/${proveedorId.proveedor_id}`);
        setListaMarca(respuesta.data.data);
      } catch (error) { }
    }
    if (proveedorId.proveedor_id !== '') {
      listaMarcas();
    }
  }, [nombreProv])

  // Función que realiza la busqueda de los clientes semejantes a al nombre introducido 
  const onChangeTextMarca = (nombreMarca) => {
    let coincidencias = [];
    if (nombreMarca.length > 0) {
      coincidencias = listaMarca.filter(marca => {
        const regex = new RegExp(`${nombreMarca}`, "gi");
        return marca.marca_nombre.match(regex)
      })
    }
    setSuggestionsMarca(coincidencias);
    setNombreMarca(nombreMarca);
  }

  // Función que obtiene el nombre del cliente seleccionado
  const onSuggestHandlerMarca = (nombreMarca) => {
    setNombreMarca(nombreMarca);
    setSuggestionsMarca([]);
  }

  /*============================================================================================*/

  /*=================================== Obtención de los id's de las categorias para insertar en la tabla servicio_producto ===================================*/
  // Almacenamiento de los datos
  const [datosCategoria, setDatosCategoria] = useState({
    categoria_id: '',
  });

  // Obtención de los id's dependiendo del select
  const handleInputChangeCategoria = (event) => {
    setDatosCategoria({
      ...datosCategoria, [event.target.name]: event.target.value
    })
  }
  /*=========================================================================================================================================================*/

  /*======================================== Buscador de servicios/productos ========================================*/
  // Almacenamiento de todos los servicios/productos
  const [listaSP, setListaSP] = useState([]);

  // Almacenamiento de los servicios/producos que tienen el no_parte semejante al instroducido
  const [suggestions, setSuggestions] = useState([]);

  // Almacenamiento del no_parte
  const [nP, setNP] = useState([]);

  // Función que realiza la consulta a la tabla servicio/proyecto
  const getSP = async () => {
    try {
      const resSP = await axios.get(url + '/api/cotizador/sp/viewFindSP');
      setListaSP(resSP.data.data);
    } catch (error) { console.log(error); }
  }

  useEffect(() => {
    getSP();
  }, [nP])

  // Función que realiza la busqueda de los servicios/productos semejantes a la no_parte introducido 
  const onChangeTextnp = (np) => {
    let coincidencias = [];
    if (np.length > 0) {
      coincidencias = listaSP.filter(sp => {
        const regex = new RegExp(`${np}`, "gi");
        return sp.spnp_np.match(regex)
      })
    }
    setSuggestions(coincidencias);
    setNP(np);
  }
  /*=================================================================================================================*/

  // Función que realiza la copia de los datos del servicio/producto seleccionado
  function copyDataSP(key) {
    setDatosSP({
      ...datosSP, sp_no_parte: suggestions[key].spnp_np,
      sp_descripcion: suggestions[key].spd_des,
      sp_meses: suggestions[key].sp_meses,
      sp_semanas: suggestions[key].sp_semanas,
      sp_comentarios: suggestions[key].sp_comentarios
    })

    setDatosCategoria({
      ...datosCategoria, categoria_id: suggestions[key].sp_id_categoria
    })

    setDatos({
      ...datos, precio_lista: suggestions[key].precio_lista,
      precio_unitario: suggestions[key].precio_unitario,
      precio_descuento: suggestions[key].precio_descuento,
      precio_total: suggestions[key].precio_total,
      sp_cantidad: suggestions[key].sp_cantidad,
      precio_id_moneda: suggestions[key].precio_id_moneda
    })
    setNombreProv(suggestions[key].proveedor_nombre);
    setNombreMarca(suggestions[key].marca_nombre);
  }

  /*======= Inserción de datos en las tablas precio,servicio_producto,sp_no_parte,sp_descripcion,sp_proveedor_marca y psp =======*/
  // Almacenamiento de los datos de un servicio/producto
  const [datosSP, setDatosSP] = useState({
    sp_no_parte: '',
    sp_descripcion: '',
    sp_meses: '',
    sp_semanas: '',
    sp_cantidad: '',
    sp_comentarios: ''
  });

  // Obtención de los datos introducidos en los input
  const handleInputChangeSP = (event) => {
    setDatosSP({
      ...datosSP, [event.target.name]: event.target.value
    })
  }

  // Almacenamiento de la última partida insertada
  var ListaPartida = {
    partida_id: '',
    partida_nombre: '',
    partida_descripcion: ''
  };

  // Almacenamiento del id de la última partida insertada 
  var partidaId = {
    partida_id: ''
  }

  // Función que realiza las inserciones a las tablas 
  async function SendSP() {
    const dataSP = {
      sp_id_spnp: '',
      sp_id_spd: '',
      sp_meses: datosSP.sp_meses,
      sp_semanas: datosSP.sp_semanas,
      sp_cantidad: datos.sp_cantidad,
      sp_id_precio: '',
      sp_id_categoria: datosCategoria.categoria_id,
      sp_comentarios: datosSP.sp_comentarios
    };

    const dataPrecio = {
      precio_lista: datos.precio_lista,
      precio_unitario: datos.precio_unitario,
      precio_descuento: datos.precio_descuento,
      precio_total: datos.precio_total,
      precio_id_moneda: datos.precio_id_moneda
    };

    const dataSpnp = {
      spnp_np: datosSP.sp_no_parte
    }

    const dataSpd = {
      spd_des: datosSP.sp_descripcion
    }

    const dataFM = {
      proyecto_fecha_modificacion: hoy
    }

    // Obtención del id del proveedor que se seleccionó en la búsqueda
    let i = Object.keys(ListaProv);
    for (let c = 0; c < i.length; c++) {
      if (nombreProv === ListaProv[c].proveedor_nombre) {
        proveedorId.proveedor_id = ListaProv[c].proveedor_id
        //console.log('proveedor id:',proveedorId);
      }
    }

    // Obtención del id de la marca que se seleccionó en la búsqueda
    let m = Object.keys(listaMarca);
    for (let c = 0; c < m.length; c++) {
      if (nombreMarca === listaMarca[c].marca_nombre) {
        marcaId.marca_id = listaMarca[c].marca_id
        //console.log('marca id:',marcaId);
      }
    }

    // Almacenamiento del id del spnp = no_parte
    let spnp = { spnp_id: '' }
    // Almacenamiento del id del spd = descripción
    let spd = { spd_id: '' }
    // Obtención del id del no_parte y descripción
    let n = Object.keys(listaSP);
    for (let c = 0; c < n.length; c++) {
      if (datosSP.sp_no_parte === listaSP[c].spnp_np) {
        spnp.spnp_id = listaSP[c].spnp_id
      }
      if (datosSP.sp_descripcion === listaSP[c].spd_des) {
        spd.spd_id = listaSP[c].spd_id
      }
    }

    if (pEstatus1 === 'En revision') {
      alert('No se puede continuar el Proyecto porque se encuentra En revision')
    } else if (pEstatus1 === 'Aceptado') {
      alert('No se puede continuar el Proyecto porque ha sido Aceptado')
    } else {
      try {
        //console.log('Id del proyecto seleccionado para cambiar la fecha:',pId);
        if (pId2 !== pId && pId2 !== '') {
          await axios.put(url2 + `/api/cotizador/proyecto/updateFM/${pId2}`, dataFM);
        } else {
          await axios.put(url2 + `/api/cotizador/proyecto/updateFM/${pId}`, dataFM);
        }
        // Inserción a la tabla precio
        const resPrecio = await axios.post(url + '/api/cotizador/precio/agregar', dataPrecio);
        // Obtención del precio_id de la inserción realizada
        dataSP.sp_id_precio = resPrecio.data.data.insertId;

        // Obtención del id de la última partida insertada del ultimo proyecto insertado del usuario que esta activo
        const resGetPartida = await axios.get(url2 + `/api/cotizador/partida/viewPU/${validatorid}`);
        ListaPartida = resGetPartida.data.data.pop();
        partidaId.partida_id = ListaPartida.partida_id;


        if (parId !== partidaId.partida_id && parId !== '') {

          if (spnp.spnp_id !== '') {
            dataSP.sp_id_spnp = spnp.spnp_id;
          } else {
            const resSpnp = await axios.post(url + '/api/cotizador/sp/agregarSpnp', dataSpnp);
            dataSP.sp_id_spnp = resSpnp.data.data.insertId;
          }

          // Obtención del Id de la descripción de un servicio/producto 
          if (spd.spd_id !== '') {
            dataSP.sp_id_spd = spd.spd_id;
          } else {
            const resSpd = await axios.post(url + '/api/cotizador/sp/agregarSpd', dataSpd);
            dataSP.sp_id_spd = resSpd.data.data.insertId;
          }
          // console.log('Datos SP:',dataSP);
          // console.log('Datos precio:',dataPrecio);
          // console.log('Id categoria:',dataCategoria);
          const respuesta = await axios.post(url2 + `/api/cotizador/sp/agregar/${parId}/${proveedorId.proveedor_id}/${marcaId.marca_id}`, dataSP);
          //console.log('Despues de la insersión:', parId);
          const respuestaBack = respuesta.data.msg
          //console.log(respuestaBack)
          alert(respuestaBack)
        } else {
          // Obtención del Id del no_parte de un servicio/producto 
          if (spnp.spnp_id !== '') {
            dataSP.sp_id_spnp = spnp.spnp_id;
          } else {
            //console.log('Nuevo No. de parte:',dataSpnp);
            const resSpnp = await axios.post(url + '/api/cotizador/sp/agregarSpnp', dataSpnp);
            dataSP.sp_id_spnp = resSpnp.data.data.insertId;
          }

          // Obtención del Id de la descripción de un servicio/producto 
          if (spd.spd_id !== '') {
            dataSP.sp_id_spd = spd.spd_id;
          } else {
            //console.log('Nueva descripción:',dataSpd);
            const resSpd = await axios.post(url + '/api/cotizador/sp/agregarSpd', dataSpd);
            dataSP.sp_id_spd = resSpd.data.data.insertId;
          }
          //console.log("else",partidaId.partida_id);
          const respuesta = await axios.post(url2 + `/api/cotizador/sp/agregar/${partidaId.partida_id}/${proveedorId.proveedor_id}/${marcaId.marca_id}`, dataSP);
          const respuestaBack = respuesta.data.msg
          //console.log(respuestaBack)
          alert(respuestaBack)
        }
      } catch (error) {
        alert('Registro de Servicio/producto invalido, revisa que hayas seleccionado correctamente el proveedor y la marca, y el tipo de moneda y categoría')
        //console.log(error);
      }
    }

    const resSP = await axios.get(url + '/api/cotizador/sp/viewFindSP');
    setListaSP(resSP.data.data);
  }

  const enviarDatosSP = (event) => {
    SendSP();
    event.preventDefault()
    //event.target.reset();
    setDatosSP({
      ...datosSP, sp_no_parte: '',
      sp_descripcion: '',
      sp_meses: '',
      sp_semanas: '',
      sp_comentarios: ''
    })

    setDatosCategoria({
      ...datosCategoria, categoria_id: ''
    })

    setDatos({
      ...datos, precio_lista: '',
      precio_unitario: '',
      precio_descuento: '',
      precio_total: '',
      sp_cantidad: '',
      precio_id_moneda: ''
    })
    setNombreProv('');
    setNombreMarca('');

  }
  /*=============================================================================================================================*/
  const [modalShow1, setModalShow1] = useState(true)
  const [proyecto_id, Setproyecto_id] = useState([])
  const lista = async (clave) => {
    console.log(clave);
    try {
      const respuesta = await axios.get(url2 + `/api/cotizador/proyecto/viewModal/${clave}`);
      Setproyecto_id(respuesta.data.reSql)


    } catch (error) {
      console.log(error)

    }
  }

  return (

    <div className="">


      <Table>

        <thead>
          <tr className="">


            <th className="ocultar">Buscar Servicios y Productos</th>
          </tr>
        </thead>
        <tbody>
          <tr >


            {/*                            
        <button type="button" className="btn btn-primary Ver" onClick={() => {setModalShow(true);lista (clave)}} >
        <i class="bi bi-eye-fill"></i>
        </button><br/><br/>
      {modalShow && modalShow1 ?   
      <ModalPtnDatos
      show={modalShow}
      proyecto_id={proyecto_id}
      onHide={() => setModalShow(false)}  
     
      />
         :  ''  } 
 */}




            <td>

              <button type="button" className="btn btn-primary Mod" onClick={() => { setShow(!show); }} >
                {show ? "Buscar servicios/productos" : "Ocultar  servicios/productos"}
              </button><br /><br />
              {show ? (
                <div></div>
              ) : (

                <div className="" >



                  <div className="table-responsive">
                    {/*********Búsqueda de Lista de Proyectos por Clave ********/}
                    <div className="busqueda-proyecto">
                      <Table >
                        <Thead>
                          <Tr >

                            <Th>No. de Parte</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr >
                            <Td>
                              <input className="agregar"
                                type="text"
                                name="proyecto_clave"
                                onChange={e => onChangeTextnp(e.target.value)}
                                value={nP}
                                placeholder="Ingrese No. de Parte del Servicio/Producto" />
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>

                    </div>
                    {/*============= Titulo Animación =============*/}
                    {/*     <Animaciones mytext="Servicios/Productos " />



 */}


                    <div className="bbb">


                      <Table>
                        <Thead>
                          <Tr>
                            <Th>Proyecto</Th>
                            <Th>Partida</Th>
                            <Th>No. de Parte SP</Th>
                            <Th>Descripción SP</Th>
                            <Th>-</Th>
                          </Tr>
                        </Thead>

                        <Tbody>
                          {Object.keys(suggestions).map((key) => (
                            <Tr key={key} >
                              <Td>{suggestions[key].proyecto_clave}</Td>
                              <Td>{suggestions[key].partida_nombre}</Td>
                              <Td>{suggestions[key].spnp_np}</Td>
                              <Td>{suggestions[key].spd_des}</Td>
                              <Td>
                                <button
                                  className="btn btn-primary detalles"
                                  onClick={() => {
                                    copyDataSP(key);
                                    //habilitar1(key);
                                  }}
                                >
                                  COPIAR
                                  {/* {textBVer[key]} */}
                                </button>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>


                      <br/>
                      <br/>
                      <br/>

                    </div>

                  </div>
                </div>


              )}

            </td>
          </tr>
        </tbody>

      </Table>



      {/*========================== Tabla Datos PTN ==========================*/}
      <form action="" method="post" onSubmit={enviarDatosSP}>
        <Table responsive id="nombreDiv">
          {/*========================== Titulos Tabla ==========================*/}
          <thead>
            <tr className="titulo-tabla-usuarios">
              <th>No. De Parte</th>
              <th>Descripción</th>
              <th> Duración Meses </th>
              <th> Entrega </th>
              <th> Moneda </th>
            </tr>
          </thead>
          <tbody>
            <tr className="">
              {/*========================== Número de Parte ==========================*/}
              <td>
                <input
                  className="agregar"
                  type="text"
                  name="sp_no_parte"
                  onChange={handleInputChangeSP}
                  placeholder="No. Parte"
                  value={datosSP.sp_no_parte}
                />
              </td>
              {/*========================Descripcion Producto ==========================*/}
              <td>
                {" "}
                <input
                  className="agregar"
                  type="text"
                  name="sp_descripcion"
                  onChange={handleInputChangeSP}
                  placeholder="Descripción"
                  value={datosSP.sp_descripcion}
                />
              </td>
              {/*========================Meses ==========================*/}
              <td>
                {" "}
                <input
                  className="agregar"
                  type="number"
                  name="sp_meses"
                  min="0"
                  onChange={handleInputChangeSP}
                  placeholder="Meses"
                  value={datosSP.sp_meses}
                />
              </td>
              {/*======================== Semanas ==========================*/}
              <td>
                <input
                  className="agregar"
                  type="number"
                  name="sp_semanas"
                  min="0"
                  onChange={handleInputChangeSP}
                  placeholder="Entrega semanas"
                  value={datosSP.sp_semanas}
                />
              </td>
              {/*======================== Moneda ==========================*/}
              <td>
                <select id="moneda" name="precio_id_moneda" onChange={handleInputChange} value={datos.precio_id_moneda}>
                  <option value={0}></option>
                  <option value={1}>MXN</option>
                  <option value={2}>USD</option>
                </select>
              </td>
            </tr>
          </tbody>
        </Table>

        {/*======================== Tabla Números ==========================*/}


        <Table responsive id="nombreDiv">
          <thead>
            <tr className="titulo-tabla-usuarios">
              <th>Calcular</th>
              <th>Cantidad</th>
              <th>Precio Lista Unitario</th>
              <th>Precio Unitario</th>
              <th> Descuento (%)</th>
              <th> Total </th>
            </tr>
          </thead>
          <tbody>
            <tr className="">
              {/*======================== Cantidad ==========================*/}
              <td>
                <label className="switch">
                  <input type="checkbox" id="checa" onClick={checa} />
                  <span className="slider"></span>
                </label>


              </td>


              <td>
                {" "}
                <input
                  className="agregar"
                  type="text"
                  name="sp_cantidad"
                  value={datos.sp_cantidad}
                  onChange={handleInputChange}
                  placeholder="Cantidad "

                />
              </td>
              {/*======================== Precio Lista ==========================*/}
              <td>
                {" "}
                <input
                  className="agregar"
                  type="text"
                  name="precio_lista"
                  value={datos.precio_lista}
                  onChange={handleInputChange}
                  placeholder="Precio Lista"

                />
              </td>

              {/*======================== Precio Unitario ==========================*/}
              <td>
                {" "}
                <input
                  className="agregar"
                  type="text"
                  value={datos.precio_unitario}
                  name="precio_unitario"
                  onChange={handleInputChange}
                  placeholder="Precio unitario"
                  disabled={Bdesc2}
                  step="any"
                />
              </td>
              {/*======================== Descuento==========================*/}
              <td>
                {" "}
                <input
                  className="agregar"
                  type="text"
                  value={datos.precio_descuento}
                  name="precio_descuento"
                  onChange={handleInputChange}
                  placeholder="Descuento"
                  disabled={Bdesc}
                  min="0"
                  step="any"
                />
              </td>
              {/*======================== Total ==========================*/}
              <td>
                {" "}
                <input
                  className="agregar"
                  type="text"
                  name="precio_total"
                  value={datos.precio_total}
                  readOnly
                  placeholder="Total"
                  step="any"
                />
              </td>
            </tr>
          </tbody>
        </Table>


        {/*========================== Datos PTN ==========================*/}
        <Table responsive id="nombreDiv">
          <thead>
            <tr className="titulo-tabla-usuarios">
              <th>Proveedor</th>
              <th>Marca</th>
              <th>Comentarios </th>
              <th>Categoría </th>
              <th> - </th>
            </tr>
          </thead>
          <tbody>
            <tr className="">
              {/*======================== Proveedor ==========================*/}
              <td>
                {" "}
                <input
                  className="agregar"
                  type="text"
                  name="proveedor_nombre"
                  onChange={e => onChangeTextProv(e.target.value)}
                  value={nombreProv}
                  placeholder="Proveedor"
                />
                {suggestionsProv && suggestionsProv.map((suggestionProv, i) =>
                  <div key={i} className="selectCliente" onClick={() => onSuggestHandlerProv(suggestionProv.proveedor_nombre)}>
                    {suggestionProv.proveedor_nombre}
                  </div>
                )}
              </td>
              {/*======================== Marca ==========================*/}
              <td>
                {" "}
                <input
                  className="agregar"
                  type="text"
                  name="marca_nombre"
                  onChange={e => onChangeTextMarca(e.target.value)}
                  value={nombreMarca}
                  placeholder="Marca"
                />
                {suggestionsMarca && suggestionsMarca.map((suggestionMarca, i) =>
                  <div key={i} className="selectCliente" onClick={() => onSuggestHandlerMarca(suggestionMarca.marca_nombre)}>
                    {suggestionMarca.marca_nombre}
                  </div>
                )}
              </td>

              {/*======================== Comentarios ==========================*/}
              <td>
                {" "}
                <input
                  className="agregar"
                  type="text"
                  name="sp_comentarios"
                  onChange={handleInputChangeSP}
                  placeholder="Comentarios"
                  value={datosSP.sp_comentarios}
                />
              </td>
              {/*======================== Categorias ==========================*/}
              <td>
                {" "}
                <select id="lista-opciones" name="categoria_id" onChange={handleInputChangeCategoria} value={datosCategoria.categoria_id}>
                  <option value={0}></option>
                  <option value={1}>Tecnología Principal</option>
                  <option value={2}>Sub-tecnología</option>
                  <option value={3}>Equipamiento</option>
                  <option value={4}>Licencia</option>
                  <option value={5}>Soporte</option>
                  <option value={6}>Implementación</option>
                </select>
              </td>
              {/*======================== Agregra Datos  ==========================*/}
              <td>
                <button className="btn btn-primary" > Agregar</button>
                {/* <button className="btn btn-primary" onClick={() => { enviarDatosDP(); enviarDatosSP(); enviarDatosM(); }}> Agregar</button> */}
              </td>
            </tr>
          </tbody>
        </Table>
      </form>
    </div>
  );
}

export default DatosSP;
