import React from "react";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export let i = "";
export let validator = cookies.get('rol');
/* export let validator = 'administrador';  */
    
// console.log(validator);


export function foo() {
    //console.log(Cookies.get('id_usuario'));
    if (validator === "administrador") {
        i = "administrador";
    } else if (validator === "preventa") {
        i = "preventa";
    } else if (validator === "venta") {
        i = "venta";
    } else if (validator === "direccion") {
        i = "direccion";
    }else {
        i = "null";

    }
   // console.log(i); // local
}
foo()



export default class ValidaUsuario extends React.Component {
    render() {
        

        if(this.state.rol[0]=== "admin"){
         //   console.log("soy admin");

         
            return(
                <div>
                    <h1>Hola Admin</h1>
                </div>
            )
        }else if  (this.state.rol[0]=== "preventa"){
        //    console.log("Soy Preventa");
       
            return(
                <div>
                    <h1>Hola Preventa</h1>
                </div>
            )
        }else if  (this.state.rol[0]=== "venta"){
         //   console.log("Soy de Ventas");
          
            return(
                <div>
                    <h1>Hola Ventas</h1>
                </div>
            )
        }else if  (this.state.rol[0]=== "direccion"){
         console.log("Soy de Dirección");
              
               return(
                   <div>
                       <h1>Hola Direccion</h1>
                
                   </div>
               )
           }
        
        else{
            console.log("ERROR");
            return(
                <div>
                    <h1>Existe un Error;</h1>
                </div>
            )

        }

    }

}