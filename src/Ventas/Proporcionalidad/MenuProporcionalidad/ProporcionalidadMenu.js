import React from "react";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Animaciones from "../../../Componentes/Animaciones";


import BuscadorProyectoFinanciamiento from "./BuscadorProyectoFinanciamiento"
import BuscadorInteligente2 from "../../AM/Menu-AM/BuscadorInteligente2";

function ProporcionalidadMenu() {

  /*========================== Mostrar/Ocultar Componente ==========================*/
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(true);


  return (
    <div className="contenido-usuarios">
      {/*======================= Titulo Animación =======================*/}

      <Animaciones mytext="Financiamiento " />

      {/*========================== Tabla  Categorias ==========================*/}
      <Table responsive id="nombreDiv">
        {/*========================== Titulos Tabla ==========================*/}
        <thead>
          <tr className="titulo-tabla-usuarios">
        
            <th className="ocultar">Resumen</th>
            <th className="ocultar">Financiamiento</th>
    
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
                }}
              >
                {" "}
                {show ? "Resumen" : "Ocultar"}{" "}
              </button>
              {show ? (
                <div></div>
              ) : (
                <div className="arregla divBuscadorInteligente">
                  {/*========================== Llamado al Componente ==========================*/}
                <BuscadorInteligente2/>
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
                }}
              >
                {" "}
                {show2 ? "Registrar Financiamiento " : "Ocultar"}{" "}
              </button>
              {show2 ? (
                <div></div>
              ) : (
                <div className="arregla">
                  {/*========================== Llamado al Componente ==========================*/}
                  <BuscadorProyectoFinanciamiento/>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default ProporcionalidadMenu;
