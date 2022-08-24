import React from 'react';
import '../../css/ventanas.css';
import {useLogin} from './Routes/useLogin';
import ReCAPTCHA from "react-google-recaptcha";
import {passwordCaptcha} from "../../Componentes/Ocultar";
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

 
 
export function Login() {



  const MostrarAlerta=()=>{

    if(valida== false){
      swal({
        title: "CAPTCHA",
        text: "Por favor Valida el Captcha",
        icon: "warning",
        button: "Cerrar"
    
      })
    }
 
  }


  const {  
    handleInputChange,
    enviarDatos
  } = useLogin ();

  return (

           /* //============ Login ============ */
           

       <div className="contenido-main-registro login">

         
      <div className="scene flex">

        <section className="card-body">
          <form action="" method="post" id="form" className="card-form" onSubmit = {enviarDatos}>
           
           {/* //============Titulo ============ */}
            <h2> <span >Login</span></h2>

           {/* //============ Correo ============ */}  

            <label htmlFor="user" className=" label">Usuario</label>
            <input id="email"
              type="email"
              name="email"
              className="card-input"
              onChange={handleInputChange}
              placeholder="Ingrese Correo" />

            {/* //============ Contraseña ============ */}

            <label htmlFor="password" className="label">Contraseña</label>   
            <input id="password"
              type="password"
              name="password"
              className="card-input"
              onChange={handleInputChange}
              data-type="password"
              placeholder="Ingrese Contraseña" />

          
             
            
            <div className="re-Captcha">
          
          {/*========== ReCAPTCHA Seguridad ==========*/}
        <ReCAPTCHA
           sitekey= {passwordCaptcha}
           onChange={onChange}
       
           /> 
         </div>


   {/* //============ Botón Entrar ============ */}

   

  
            <div className ="">
            <br></br>
            <button className="btn-login" type="submit"  onClick={ ()=>MostrarAlerta()}    >   
              <span>Entrar</span>
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

export default Login