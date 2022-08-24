import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import Table from "react-bootstrap/Table";
import "../css/excel.css"
import axios from "axios";
import {url2} from "../Ocultar";
import Cookies from 'universal-cookie';

let validarFile = true;

//Obtención del id del usuario con sesión activa
const cookies = new Cookies();
export let validatorid = cookies.get('id_usuario');

export let dataPartidas = [];

function Excel(props) {

   const [items, setItems] = useState([]);


  const readExcel = (file) => {

    const promise = new Promise((resolve, reject) => {

      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file)
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: 'buffer' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws)
        resolve(data);

      };

      fileReader.onerror = (error) => {
        reject(error);
      };

    });

    promise.then((d) => {
   /*    console.log(d); */
      setItems(d)

      dataPartidas = d;

      console.log(dataPartidas);
    });

  };


  const [show2, setShow2] = useState(true)
  let pIdExcel;

  function getpIdExcel(id){
    pIdExcel = id;
  }

  async function cargarDatos(){
    if(show2){
      const resProy = await axios.get(url2 + `/api/cotizador/proyecto/viewpreventas/${validatorid}`);
      let proy = resProy.data.data.pop(); 
      getpIdExcel(proy.proyecto_id);
      if(props.clave !== '' && props.clave !== undefined){
        let res = await axios.post(url2 + `/api/cotizador/sp/insertExcel/${ props.clave }`, dataPartidas);
      }else{
        let res = await axios.post(url2 + `/api/cotizador/sp/insertExcel/${ pIdExcel }`, dataPartidas);
      }
/*       console.log('Objetos excel:',dataPartidas);
      console.log('Id del proyecto:', pIdExcel); */
      /* alert(res.data.msg);
       */

      alert("Datos Subidos Correctamente");
    }
  }

  return (
    <div  className=''>


<div className='cargar-datos'>

  <br/>
  <br/>

  <h3>Cargar Plantilla Excel</h3>

      <input className="btn btn-primary Mod"
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);

          if (file != null){
            validarFile = false;
          }
        }}
      />

</div>


     <div className='plantilla-excel'>

    

<Table  responsive  striped bordered hover size="sm">
        <thead>
          <tr>
            <th scope="col"> Partida</th>
            <th scope="col"> Descripcion_Partida</th>
            <th scope="col"> Categoria</th>
            <th scope="col"> Proveedor</th>
            <th scope="col"> Marca</th>
            <th scope="col"> N° Parte</th>
            <th scope="col"> Descripción</th>
            <th scope="col"> Duracion</th>
            <th scope="col"> Entrega</th>
            <th scope="col"> Moneda</th>
            <th scope="col"> Cantidad</th>
            <th scope="col"> Precio_Lista</th>
            <th scope="col">Descuento</th>
            <th scope="col">Com</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d) => (

              
            <tr key={d.Id}>

              <td> {d.Partida} </td>
              <td>{d.Descripcion_Partida} </td>
              <td>{d.Categoria} </td>
              <td>{d.Proveedor}</td>
              <td> {d.Marca} </td>
              <td>{d.No_Parte} </td>
              <td>{d.Descripcion} </td>
              <td>{d.Duracion_Meses}</td>
              <td> {d.Entrega_Semanas} </td>
              <td>{d.Moneda} </td>
              <td>{d.Cantidad} </td>
              <td>{d.Precio_Lista}</td>
              <td>{d.Descuento}</td>
              <td>{d.Comentarios}</td>

            </tr>

          ))}
        </tbody>

        </Table>

        </div>



<br/>
<br/>

<div className='subir-datos'>
            <button
              disabled={validarFile}
              className="btn btn-primary Mod"
              type="button"
              onClick={() => {
                setShow2(!show2);
                cargarDatos();
                alert("Datos Subidos Correctamente")
              }}
            >
              {" "}
              {show2 ? "Subir Datos" : "Ocultar"}{" "}
            </button>
  </div>
            
{/* <button  className='btn btn-primary Mod'> Subir Datos</button>
 */}


<br/>
<br/>

    </div>
  );
}

export default Excel