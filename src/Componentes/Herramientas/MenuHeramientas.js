import React from 'react'
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Animaciones from "../../Componentes/Animaciones";
import Cookies from 'universal-cookie';
import pdf from "../../Componentes/Manuales/Manual_Administrador_V1.pdf";
import pdf2 from "../../Componentes/Manuales/Manual_Preventa_V1.pdf";
import pdf3 from "../../Componentes/Manuales/Manual_Ventas_V1.pdf";
import Plantilla from "../../Componentes/Manuales/Plantilla.xlsx"



let G;

const cookies = new Cookies();
let tipoRol = cookies.get('rol');
let i = "";
if (tipoRol === "administrador") {
  G = pdf;
} else if (tipoRol === "preventa") {
  G = pdf2;
} else if (tipoRol === "venta") {
  G = pdf3;
} else {
  i = "null";

}

function MenuHeramientas() {


  return (


    <div className="">


      <Animaciones mytext="Documentos" />

      {/*========================== Tabla  Categorias ==========================*/}
      <Table >
        {/*========================== Titulos Tabla ==========================*/}
        <tbody>
          <tr className="headerPropuesta">
            {/*========================== Divisa ==========================*/}
            <td>
              <form method="get" action={G}>
                <button className="btn btn-primary PDF" > Manual de Usuario PDF
                </button>
              </form>
            </td>
            <td>
              <form method="get" action={Plantilla}>
                <button className="btn btn-primary Excel" > Descargar Plantilla Excel
                </button>
              </form>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default MenuHeramientas