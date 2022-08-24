import axios from 'axios';
import React ,{useState, useEffect} from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import Excel from './excel';


export const LP = (props) => {
    /*========================== Mostrar/Ocultar ==========================*/
    const [show,setShow] = useState(true); //Menu resumen
    const [show4,setShow4] = useState([]);
    const [textBVer,setTextBVer] = useState([]);// Texto de los botones de mostrar
    /*=====================================================================*/

    const [claveP,setClaveP] = useState();

    // useEffect(()=>{
    //     console.log(claveP)
    // },[claveP])
    useEffect(() => {
        let i = Object.keys(props.suggestionsP)
        i = i.length
        setShow4(Array(i).fill(true));
        setTextBVer(Array(i).fill('bi bi-play-fill'));
    },[props.suggestionsP])

    const habilitar1 = (key) =>{
        key = parseInt(key);
        const newArr =[];
        const newArr2 = [];
        let c = Object.keys(props.suggestionsP);
        c = c.length;
        setTextBVer(Array(c).fill('bi bi-play-fill'));
        for (let i = 0 ; i < c ; i++){
            if(i === key){
                newArr[i] = !show4[i];
                setShow(newArr[i]);
                if(show4[i] === false){
                    newArr2[i] = 'bi bi-play-fill';
                }else{
                    newArr2[i] = 'bi bi-eye-slash-fill';
                }
            }
            if(i !== key){
                newArr[i]=true;
                newArr2[i] = 'bi bi-play-fill';
            }
        }   
        setShow4(newArr);
        setTextBVer(newArr2);
    }

    return (

        <div className=''>
            <Table   id = "daTable" >
                <Thead>
                    <Tr >
                        <Th>ID</Th>
                        <Th>Clave</Th>
                        <Th>Descripción</Th>
                        <Th>Cliente</Th>
                        <Th>Fecha Creación</Th>
                        <Th>Fecha Modificación</Th>
                        <Th>Estatus</Th>
                        <Th>Plazo Meses</Th>
                        <Th>Continuar</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                                
                <Tbody>
                    {Object.keys(props.suggestionsP).map((key) => (    
                        <Tr key={props.suggestionsP[key].proyecto_id} >
                            <Td>{props.suggestionsP[key].proyecto_id}</Td>  
                            <Td>{props.suggestionsP[key].proyecto_clave}</Td>   
                            <Td>{props.suggestionsP[key].proyecto_descripcion}</Td>  
                            <Td>{props.suggestionsP[key].nombre_cliente}</Td> 
                            <Td>{props.suggestionsP[key].proyecto_fecha_creacion}</Td>
                            <Td>{props.suggestionsP[key].proyecto_fecha_modificacion}</Td>
                            <Td  className={props.suggestionsP[key].proyecto_estatus}>{props.suggestionsP[key].proyecto_estatus}</Td>
                            <Td >{props.suggestionsP[key].proyecto_plazo_meses}</Td> 
                            <Td width={"100px"}>
                            {" "}
                                <button
                                    className="sn-boton ver"
                                    type="button"
                                    onClick={() => {
                                        habilitar1(key);
                                        setClaveP(props.suggestionsP[key].proyecto_id);
                                    }}
                                >
                                    <i className= {textBVer[key]}></i>
                                </button>
                            </Td>
                            
                        </Tr>  
                    ))}
                </Tbody>          
            </Table>

            {show ? (
                <></>
            ):(
                <div className="">
                {/*     <DatosPTN clave={clavep} /> */}
          
                <Excel   clave={claveP} />
          
                  </div>
         
            )}
            {/* </form> */}
        </div>
    )
}
