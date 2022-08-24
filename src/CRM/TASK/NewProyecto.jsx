import React from 'react';

import ReCAPTCHA from "react-google-recaptcha";

import swal from "sweetalert"


export let valida =false;


/*  Funcion Captcha Validación Correcta */

function onChange(value) {



  
  /*   console.log("Captcha value:", value);
 */

    if(value != null){
 /*    console.log("No eres un robot");  */
      valida= true;
    }else{
      /*     console.log("eres un robot"); */
          valida=false;
    }

  }

 
 
export function NewProyecto() {


  return (

           /* //============ Login ============ */
           

       <div className="contenido-main-registro login">

         
      <div className="scene flex">

        <section className="card-body">
          <form action="" method="post" id="form" className="card-form" >
           
           {/* //============Titulo ============ */}
            <h2> <span >Nuevo Proyecto</span></h2>

           {/* //============ Correo ============ */}  

            <label htmlFor="user" className=" label">Nombre</label>

            <input id="password"
              type="number"
              name="password"
              className="card-input"
      
              data-type="password"
              placeholder="Ingrese Nombre Proyecto" />



            {/* //============ Contraseña ============ */}

            <label htmlFor="password" className="label">Responsable</label>   
            <input id="password"
              type="number"
              name="password"
              className="card-input"
      
              data-type="password"
              placeholder="Ingrese Responsable Proyecto" />

          
             
            
            <div className="re-Captcha">
          
          {/*========== ReCAPTCHA Seguridad ==========*/}

         </div>


   {/* //============ Botón Entrar ============ */}

   

  
            <div className ="boton-login login">
            <br></br>
            <button className="btn-login" type="submit"     >   
              <span>Registrar</span>
            </button>
            </div>
          </form>
        </section>
      </div>


      <div>        
      </div>
   </div>




  )
}

export default NewProyecto