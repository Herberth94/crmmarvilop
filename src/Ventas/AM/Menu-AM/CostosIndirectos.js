import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import {costosIndirectos, equivale,  totalIndirecto, stringDolar} from "../../Operaciones/OperacionesAM";
import { EditCI } from '../Routes/ModificarPorcentajesCI';
import {Partida_catalogo} from '../../Operaciones/totalPartida'
import { url, url2 } from '../../../Componentes/Ocultar';
import { pId

} from './BuscadorInteligente';

function CostosIndirectos(props) {


    const[pCI, setPCI] = useState([]);


    const { 
        getTotalPar,
        getPorcentajesPar,
        getTotalCats,
        getPorcentajesCats,
        getDivisaProy,
        getFinanciamieno,
        getPorcentajesCI} = Partida_catalogo();


        async function consultarTotalesP(id){          //console.log(id)
            try{
    
                getTotalPar('');
                getPorcentajesPar('');
                getPorcentajesCats('');
                getDivisaProy('');
                getPorcentajesCI('');
                getFinanciamieno('');
    
              
     
                const resTotPar = await axios.get(url2 + `/api/cotizador/am/viewTotalesPartidas/${id}`);
                getTotalPar(resTotPar.data.data);
    
                const resAMPar = await axios.get(url2 + `/api/cotizador/am/viewAMPartidas/${id}`);
                getPorcentajesPar(resAMPar.data.data);
    
                const resTotCats = await axios.get(url2 + `/api/cotizador/am/viewTotalesCategorias/${id}`);
                getTotalCats(resTotCats.data.data);
    
                const resAMCats = await axios.get(url2 + `/api/cotizador/am/viewAMCategorias/${id}`);
                getPorcentajesCats(resAMCats.data.data);
    
                const dProy = await axios.get(url2 + `/api/cotizador/am/viewDivisa/${id}`);
                getDivisaProy(dProy.data.data);
    
                const resCI = await axios.get(url2 + `/api/cotizador/ci/view/${id}`);
                getPorcentajesCI(resCI.data.data);
                setPCI(resCI.data.data);
    
                const resdF = await axios.get(url2 + `/api/cotizador/proporcionalidad/view/${id}`);
                getFinanciamieno(resdF.data.data);
    
            }catch (error){
                console.log(error);
            }//console.log('Categorias',totalCategorias);
        }





    /*========================== Mostrar/Ocultar ==========================*/
    const [activar, setActivar] = useState([]);
    const [textBModificar,setTextBModificar] = useState([]);//Texto de los botones de modificar
    /*=====================================================================*/

    /*========================== Habilitar/Deshabilitar ==========================*/
    const [enable, setenable] = useState([]);//Inputs
    /*============================================================================*/

    const [data,setData] = useState ({
        porcentaje:''
    });

    const handleInputChange = (event) => {
        setData({
          ...data,[event.target.name] : event.target.value
        })
    }
    
    useEffect(() => {
        let i = Object.keys(costosIndirectos)
        i = i.length
        setenable(Array(i).fill(true));
        setActivar(Array(i).fill(true));
        setTextBModificar(Array(i).fill('bi bi-pencil-square'));
        //console.log('Porcentajes CI%:',props.ci);
    },[costosIndirectos])

    const habilitar = (key) =>{
        //console.log(costosIndirectos[key]);
        key = parseInt(key);
        const newArr =[] 
        const newArr2 = [];
        const newArr3 = [];
        let c = Object.keys(costosIndirectos);
        c = c.length;
        for (let i = 0 ; i < c ; i++){
            if(i === key){
                newArr[i] = !enable[i];
                if(enable[i] === false){
                    newArr2[i] = 'bi bi-pencil-square';
                    setData({
                        ...data, porcentaje :''
                      })
                }else{
                    newArr2[i] = 'bi bi-check-lg';
                }
                newArr3[i] = !activar[i];
            }
            if(i !== key){
                newArr[i]=true;
                newArr2[i] = 'bi bi-pencil-square';
                newArr3[i]=true;
            }

        }   
        setenable(newArr);
        setTextBModificar(newArr2);
        setActivar(newArr3);
    }

    const {actualizacion} = EditCI();

    const envioData = (key) => {
        if(activar[key] === false){
            actualizacion(props.ci,costosIndirectos[key],data);
        }
    }

  return (
      
    <div className="contenido-marvilop">
 
{/*    <div> <Animaciones mytext="Costos Indirectos" /> </div> 
 */}
   <Table >
                <Thead>
                    {/*=================== Titulos Tabla Clientes ===================*/}
                    <Tr >
                        <Th>Descripción</Th>
                        <Th>Equivale a % </Th>
                        <Th>Total </Th>
                        <Th>Divisa </Th>
                        <Th>Modificar </Th>
                        <Th></Th>
 
                    </Tr>
                </Thead>
                <Tbody>
                    {/*=================== Contenido Tabla Clientes =================*/}

                    {Object.keys(costosIndirectos).map((key) => (
                        <Tr key={key}>
                            {/*================= Descripción==================*/}
                            <Td >{costosIndirectos[key]}</Td>

                            {/*================= Equivale ==================*/}
                            <Td     className="editar" >
                                        <input
                                        className="input-name"
                                        type="number"
                                        defaultValue={equivale[key] } 
                                        disabled={enable[key]} 
                                        onChange={handleInputChange}
                                        name="porcentaje" 
                                        ></input> 
                                    </Td>
                            {/*================= Total Indirecto ==================*/}
                            <Td> {" $ "}{ totalIndirecto[key]} </Td>
                            <Td>{stringDolar}</Td>

                            {/*================= Editar==================*/}
                     {/*        <td>
                                <button 
                                className="btn btn-primary Mod"
                                onClick={() => {
                                    habilitar(key);
                                    envioData(key);
                                }}
                                >{textBModificar[key]}
                                </button>
                            </td> */}
                            
                            {enable[key] ? (
                                <Td  >
                                    <button 
                                    className=  "sn-boton" type="button"
                                    onClick={()=>{
                                    //    props.envioData(datos,key,data); 
                                    habilitar(key);
                               
                                    }}
                                    >
                                        <i className  = {textBModificar[key]}  ></i>
                                    </button>
                                    
                                </Td>
                            ):(
                              < >
                                    <Td >
                                    <button 
                                    className="sn-boton" type="button"
                                    onClick={()=>{
                                        habilitar(key);
                                        envioData(key);
                                        

                                        
                                    consultarTotalesP(pId);

                                        



                                    }}
                                    >
                                        <i className= {textBModificar[key]}  ></i>
                                    </button>
                                </Td>



                             


                                <Td >
                                    <button 
                                    className="sn-boton cancelar" type="button"
                                    onClick={()=>{
                                      /*   props.envioData(datos,key,data);  */
                                        habilitar(key); 
                                       //props.setfirst(activar[key]); 
                                    }}
                                    >
                                        <i className= "bi bi-x-lg"  ></i>
                                    </button>
                                </Td>
                                </>
                            )}

                        </Tr>
                    ))}
                </Tbody>
            </Table>



    </div>
  )
}

export default CostosIndirectos