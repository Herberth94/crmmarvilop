import React,{useState, useEffect} from 'react';
import * as XLSX from 'xlsx';
import {
    Cantidad, name_cliente, clave_p, descripcionGeneral, partidasUnicas2,
    TOTALSTRING, TOTALSTRINGMENSUAL  ,   totalsnIVA
  } from "../../../Ventas/Operaciones/OperacionesAM";
  
const ExportExcel = () => {
console.log("Datos");
   
const dataToEconomic =()=>{

    console.log("Datos LLenados");
    const prueba=[]
    let deleteToString 
    for (let i=0;i<TOTALSTRING.length-1;i++){
        if(TOTALSTRING[i].includes('$')){
            deleteToString  = TOTALSTRING[i]
            deleteToString = deleteToString.trim();
            deleteToString=deleteToString.slice(1);
            TOTALSTRING[i]=deleteToString;
            console.log(deleteToString);
        }
         
        prueba[i]={
            Cantidad:Cantidad[i],
            Partida:partidasUnicas2[i],
            Descripción: descripcionGeneral[i],
            Precio_Unitario_Mensual:TOTALSTRING[i],
            Precio_Total_Mensual:TOTALSTRINGMENSUAL[i]
            
            }
    }
    deleteToString=[]
    
    return prueba
}


const [sheetData, setsheetData] = useState([]);
useEffect(() => {
    const data = dataToEconomic();
    setsheetData(data);
    
   
},[])

const createToExcel = ()=>{
    const new_workbook = XLSX.utils.book_new();
    //const worksheet = XLSX.utils.aoa_to_sheet([Cantidad],{c:1, r:4});
    const convertToJson = XLSX.utils.json_to_sheet(sheetData);
    
    XLSX.utils.book_append_sheet(new_workbook,convertToJson);
    XLSX.writeFile(new_workbook,"prueba.xlsx");
    


}
   
  return (
    <div>
        <button className="btn btn-success " onClick={createToExcel}> Excel </button>

    </div>
  )
}

export default ExportExcel