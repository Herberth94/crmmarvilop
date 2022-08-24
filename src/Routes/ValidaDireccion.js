import { Redirect, Route } from "react-router"
import ValidaRol from './ValidaRol';
import {i} from './ValidaRol';

//Validacion de Usuario Administrador

let  auth = true;

if(i=== "direccion"){

  auth = true;
}else{
  auth = false;
}
const Direccion= ({component:Component, ...rest}) => {
    <ValidaRol />

    if( i==="direccion"){
//console.log("Hola Venta")

return (
    
    <Route {...rest}>{auth? <Component/> : <Redirect to ="/"/>}   </Route>  
      
  )
    }else{
    //    console.log("No soy  de Preventa")

    }
    return (null )
    
}



export  default Direccion