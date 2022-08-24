import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {url2} from '../../../Componentes/Ocultar';
import Table from "react-bootstrap/Table";
import Cookies from 'universal-cookie';
import ModalCat from "../Routes/ModalCat";

//Componentes
import { InsertDatosCats } from '../Routes/GuardarDatosCategorias';
/*============== Operacions PTN BOM ==============*/
import { precioUnitario, calcularDescuento, Total} from "../Operaciones/Operaciones";
const cookies = new Cookies();
let validatorid = cookies.get('id_usuario');
let validaOperacion = false;
function Categorias(props) {
    /*=================================== Obtención de datos en la tabla precio ===================================*/
    // Almacenamiento de los datos
    console.log(props.clave)
    function checa(){

        validaOperacion = !validaOperacion;
        setBdesc(!Bdesc);
        setBdesc2(!Bdesc2);
        setDatos({
            precio_lista: '',
            precio_unitario: '',
            precio_descuento: '',
            cd_cantidad: '',
            precio_total: ''           
        });
        }
        
    const [datos, setDatos] = useState({
        precio_lista: '',
        precio_unitario: '',
        precio_descuento: '',
        cd_cantidad: '',
        precio_total: '',
        precio_id_moneda:''
    });
    
    const handleInputChangePrecio = (event) => {
        setDatos({
        ...datos,[event.target.name]: event.target.value,
        });
    };

///CALCULAR DESCUENTO
      /*================================================================================*/
      useEffect(()=>{

        if(datos.precio_lista !=='' && datos.precio_unitario !==''  && validaOperacion === false){
          const desc = calcularDescuento(datos.precio_lista, datos.precio_unitario);
          const total = Total(datos.precio_unitario,datos.cd_cantidad)
          setDatos({ ...datos,  precio_total:   total, precio_descuento: desc });}
       
        if(datos.precio_lista === '' || datos.precio_unitario === ''){
          setDatos({ ...datos,  precio_descuento:''});
        }

        },[datos.sp_cantidad,datos.precio_lista,datos.precio_unitario   ])


///CALCULAR PRECIO UNITARIO
      /*===================================================================================================================*/
      useEffect(()=>{
        let precio_u='';
        if (datos.precio_lista !== '' &&  datos.precio_descuento !== ''  &&  validaOperacion ===true) {
          precio_u = precioUnitario(datos.precio_lista, datos.precio_descuento);
          const total = Total(precio_u, datos.cd_cantidad);
          if( datos.precio_descuento < 0 || datos.precio_descuento > 100 ){
          // alert("Advertencia Porcentaje Invalido")
          }
          setDatos({ ...datos, precio_total:total,precio_unitario:precio_u});
        }
      
      },[datos.precio_descuento,datos.precio_lista,datos.sp_cantidad])

      //OBTENER TOTALES

//checar
           /*===================================================================================================================*/
           useEffect(()=>{

            if(datos.precio_unitario === '' || datos.sp_cantidad === ''){
              setDatos({ ...datos,precio_total:''});
            } 
          
          },[,datos.precio_unitario,datos.sp_cantidad])
    /*===================================================================================================================*/
    /*=============================================================================================================*/
    const {enviarDatos,handleInputChange,finalizarProy} = InsertDatosCats();
    const [modalShow, setModalShow] = useState(false);
    const [DatosCat, SetDatosCat] = useState([])
    const[ Bdesc, setBdesc]= useState(true);
    const[ Bdesc2, setBdesc2]= useState(false);
    const lista = async (clave) =>{
        try {
            const respuesta = await axios.get(url2+`/api/cotizador/catd/view/modal/${clave}`);
            SetDatosCat(respuesta.data.data)
            
        } catch (error) {
            console.log(error);            
        }
        
    }
   const send =(e,datos)=>{
    enviarDatos(e, datos);
    setDatos({
        precio_lista: '',
        precio_unitario: '',
        precio_descuento: '',
        cd_cantidad: '',
        precio_total: '',
        precio_id_moneda:''
    });

   }

   function confirFinalizar(){
    const confirmacion = window.confirm(
        "¿Seguro que quieres Finalizar este Proyecto?"
      );
      if(confirmacion){
        finalizarProy()
      }else{

      }
    
   }
    
    
    return (
        <div className="">
             <button type="button" className="btn btn-primary" onClick={() => {setModalShow(true);lista (props.clave)}} >
                 Ver Categorias agregadas
             </button><br/><br/>
             {modalShow  ?   
             <ModalCat
             show={modalShow}
             proyecto_id={DatosCat}
             onHide={() => setModalShow(false)}  
             />:  ''  } 
            <form action="" method="post" onSubmit = {(e) => {send(e, datos)}}>
                <Table responsive id="nombreDiv">
                {/*========================== Titulos Tabla ==========================*/}
                <thead>

                <tr className="titulo-tabla-usuarios">
                    <th></th>           
                    <th className='titulo-tabla'>Categorias Adicionales</th>            
                    </tr>
                    <tr className="titulo-tabla-usuarios">
                    
                    <th className= 'agregar'  width={"150px"}> No. De Parte</th>
                    <th  className='agregar'>Categoria</th>
                    <th className='agregar'>Moneda</th>
                    <th className='agregar'>Descripción</th>
                    <th className='agregar'>Duración Meses </th>
                    <th className='agregar'>Entrega Semanas</th>
                    <th className='agregar'>Calcular</th>  
                    <th className='agregar'>Cantidad</th>
                    <th className='agregar'>Precio Lista</th>
                    <th className='agregar'>Precio Unitario</th>
                    <th className='agregar'>Descuento (%)</th>
                    <th className='agregar'>Total</th>
                    <th className='agregar'>Comentarios</th>
                    <th className='agregar'>-----</th>
                  
                    </tr>
                </thead>
                <tbody>
                    <tr className="">
                    {/*======================== Categorias ==========================*/}

            

                  {/*========================== Número de Parte ==========================*/}
                  <td>
                        <input
                        className="agregar"
                        type="text"
                        name="cd_no_parte"
                        onChange={handleInputChange}
                        placeholder="No. Parte"
                        />
                    </td>
               
                    <td>
                        {" "}
                        <select id="lista-opciones" name="cd_id_cats" onChange={handleInputChange}>
                            <option value={0}></option>
                            <option value={1}>Capacitación</option>
                            <option value={2}>Accesorios</option>
                            <option value={3}>Servicios PTN</option>
                            <option value={4}>Mesa de Ayuda</option>
                            
                        </select>
                    </td>

                    <td width={"100px"}>
                        <select id="moneda" name="precio_id_moneda" 
                        onChange={handleInputChangePrecio}
                        >
                            <option value={0}></option>
                            <option value={1}>MXN</option>
                            <option value={2}>USD</option>
                        </select>
                    </td>
                  
                    {/*========================Descripcion Producto ==========================*/}
                    <td>
                        {" "}
                        <input
                        className="agregar"
                        type="text"
                        name="cd_descripcion"
                        onChange={handleInputChange}
                        placeholder="Descripción"
                        />
                    </td>
                    {/*========================Meses ==========================*/}
                    <td width={"100px"}>
                        {" "}
                        <input
                        className="agregar"
                        type="number"
                        name="cd_meses"
                        min="0"
                        onChange={handleInputChange}
                        placeholder="Meses"
                        />
                    </td>
                    {/*======================== Semanas ==========================*/}
                    <td  width={"100px"}>
                        <input
                        className="agregar"
                        type="number"
                        name="cd_semanas"
                        min="0"
                        onChange={handleInputChange}
                        placeholder="Semanas"
                        />
                    </td>
                    {/*======================== Moneda ==========================*/}





                        {/*======================== Funcion Calcular==========================*/}
                        <td>
                <label className="switch">
                <input type="checkbox" id="checa"     onClick={checa}/>
                <span className="slider"></span>
                </label>   
                </td>
                    {/*======================== Cantidad ==========================*/}
                    <td width={"100px"}>
                        {" "}
                        <input
                        className="agregar"
                        type="number"
                        name="cd_cantidad"
                        value={datos.cd_cantidad}
                        onChange={handleInputChangePrecio}
                        placeholder="Cantidad "
                        
                        />
                    </td>
                    {/*======================== Precio Lista ==========================*/}
                    <td>
                        {" "}
                        <input
                        className="agregar"
                        type="number"
                        name="precio_lista"
                        value={datos.precio_lista}
                        onChange={handleInputChangePrecio}
                        placeholder="Precio Lista"
                        
                        />
                    </td>

                    {/*======================== Precio Unitario ==========================*/}
                    <td>
                        {" "}
                        <input
                        className="agregar"
                        type="number"
                        value={datos.precio_unitario}
                        name="precio_unitario"
                        onChange={handleInputChangePrecio}
                        placeholder="Precio unitario"
                        step="any"
                        disabled={Bdesc2}
                        />
                    </td>
                    {/*======================== Descuento==========================*/}
                    <td>
                        {" "}
                        <input
                        className="agregar"
                        type="number"
                        value={datos.precio_descuento}
                        name="precio_descuento"
                        onChange={handleInputChangePrecio}
                        placeholder="Descuento"
                        min="0"
                        step="any"
                        disabled ={Bdesc}
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



                    <td>
                                {" "}
                                <input
                                className="agregar"
                                type="text"
                                name="cd_comentarios"
                                onChange={handleInputChange}
                                placeholder="Comentarios"
                                />
                            </td>
                            <td>
                                {/*=======================  Boton Agregar Categoria ======================= */}
                                <button className="btn btn-primary" type="submit">Agregar</button>
                            </td>
                   
                    </tr>
                </tbody>
                </Table>
                {/*======================== Tabla Números ==========================*/}
             
            
            </form>

            <button className="btn btn-primary modificar" 
            onClick={() =>
                //finalizarProy() 
                confirFinalizar()
            }>Finalizar proyecto</button>
          <br></br>
          <br></br>
        
          <br></br>
        
        
        </div>
    )
}

export default Categorias