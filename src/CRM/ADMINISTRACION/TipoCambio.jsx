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

 
 
export function TipoCambio() {


  return (

           /* //============ Login ============ */
           

       <div className="contenido-main-registro login">

         
      <div className="scene flex">

        <section className="card-body">
          <form action="" method="post" id="form" className="card-form" >
           
           {/* //============Titulo ============ */}
            <h2> <span >Divisa</span></h2>

           {/* //============ Correo ============ */}  

            <label htmlFor="user" className=" label">Moneda</label>

  <select >
  <option value="value1">MXN</option>
  <option value="value2" selected>USD</option>
  <option value="value3">EUR</option>
  </select>



            {/* //============ Contraseña ============ */}

            <label htmlFor="password" className="label">Precio</label>   
            <input id="password"
              type="number"
              name="password"
              className="card-input"
      
              data-type="password"
              placeholder="Ingrese Valor" />

          
             
            
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

export default TipoCambio