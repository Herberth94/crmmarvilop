import React from "react";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Animaciones from "../../../Componentes/Animaciones";
import Divisa from "./Divisa";
import ResumenAM from "./ResumenAM";
import BuscadorInteligente from "./BuscadorInteligente";




function AmMenu() {
   /*========================== Mostrar Ocultar Tabla ==========================*/
  const [show, setShow] = useState(true);

   /*========================== Mostrar Ocultar Botón ==========================*/
  const [show2, setShow2] = useState(true);

   /*========================== Mostrar Ocultar Datos Adicionales ==========================*/
  const [show3, setShow3] = useState(true);

  return (
    <div className="contenido-usuarios">
      {/*======================= Titulo Animación =======================*/}
      <Animaciones mytext=" Análisis de Margen" />
      {/*========================== Tabla  Categorias ==========================*/}
      <Table responsive id="nombreDiv">
        {/*========================== Titulos Tabla ==========================*/}
        <thead>
          <tr className="titulo-tabla-usuarios">
            <th className="ocultar">Divisa</th>
            <th className="ocultar">Resumen AM</th>
            <th className="ocultar">Costos Indirectos</th>
          </tr>
        </thead>
        <tbody>
          <tr className="headerPropuesta">
            {/*========================== Divisa ==========================*/}
            <td>
              <button
                className="btn btn-primary modificar"
                type="button"
                onClick={() => {
                  setShow(!show);
                  setShow2(true);
                  setShow3(true);
                }}
              >
                {" "}
                {show ? "Agregar Divisa" : "Ocultar"}{" "}
              </button>
              {show ? (
                <div></div>
              ) : (
                <div className="arregla divBuscadorInteligente">
                  {/*========================== Llamado al Componente ==========================*/}
                   <Divisa/>
                </div>
              )}
            </td>

            <td>
              <button
                className="btn btn-primary modificar"
                type="button"
                onClick={() => {
                  setShow2(!show2);
                  setShow(true);
                  setShow3(true);
                }}
              >
                {" "}
                {show2 ? "Resumen AM" : "Ocultar"}{" "}
              </button>
              {show2 ? (
                <div></div>
              ) : (
                <div className="arregla divBuscadorInteligente">
                  {/*========================== Llamado al Componente ==========================*/}
                <ResumenAM/>
                </div>
              )}
            </td>

            <td>
              <button
                className="btn btn-primary modificar"
                type="button"
                onClick={() => {
                  setShow3(!show3);
                  setShow(true);
                  setShow2(true);
                }}
              >
                {" "}
                {show3 ? "Costos Indirectos" : "Ocultar "}{" "}
              </button>
              {show3 ? (
                <div></div>
              ) : (
                <div className="arregla">
                  {/*========================== Llamado al Componente ==========================*/}
                  {/*           <CostosIndirectos/> */}
                  <BuscadorInteligente/>
                </div>
              )}
            </td>

          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default AmMenu;
