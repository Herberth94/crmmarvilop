import { useState } from "react/cjs/react.development"
import TableRows from "./TableRows"

function  K(){
    const [rowsData, setRowsData] = useState([]);
 
    const addTableRows = ()=>{
  
        const rowsInput={
            fullName:'',
            emailAddress:'',
            salary:''  ,
            

        } 
        setRowsData([...rowsData, rowsInput])
      
    }
   const deleteTableRows = (index)=>{
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
   }
 
   const handleChange = (index, evnt)=>{
    
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
  
 
 
}
    return(

    
        <div className="contenido-usuarios">
            <div className="row">
                <div className="col-sm-8">
                <table className="table">
                    <thead>
                      <tr>
                      <th><button className="btn btn-outline-success" onClick={addTableRows} >+</button></th>
                          <th>N° Parte</th>
                          <th>Descripcion</th>
                          <th>Meses</th>
                          <th>Semanas</th>
                          <th>Moneda</th>
                          <th>Cantidad</th>
                          <th>N° Parte</th>
                          <th>P Lista Unitario</th>
                          <th>P Unitario</th>
                          <th>Descuento</th>
                          <th>Total</th>
                          <th>Proveedor</th>
                          <th>Marcas</th>
                          <th>Comentarios</th>
                          <th>Categoria</th>

                      </tr>
                    </thead>
                   <tbody>
                   <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />
                   </tbody> 
                </table>
                </div>
                <div className="col-sm-4">
                </div>
            </div>
        </div>
    )
}
export default K