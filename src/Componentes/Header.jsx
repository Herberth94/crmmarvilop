import React, { useState } from 'react';
/* import "../Menu/ValidacionRol/scss/header.css" */


let theme ="bi bi-brightness-high";

function Header() {

    const [isTheme, setTheme] = useState(false);

    const toggleClassTheme = () => {
        setTheme(!isTheme);

        if(isTheme == true){
          theme="bi bi-brightness-high"
        }else{
            theme="bi bi-moon-stars-fill"
        }
      };

  return (
<div className='header '>

    <div className='buscador'>
    <input type="search" name="busqueda" placeholder="Search..." />
    </div>



    <div className='iconos'>

    <nav  className='iconos'>
			<ul className='iconos'>
				<li className='iconos'>
                    <a href="#"   onClick={toggleClassTheme}>


                    <i className={theme}></i>
                  
                    </a></li>
				<li className='iconos'>
                    <a href="#">
                    <i className="bi bi-bell"></i>
               
                    </a></li>
				<li className='iconos'>
                    <a href="#"  id='oscuro'>
                    <i className="bi bi-circle  "></i>
                     
                    </a>



                    
                </li>
			</ul>
		</nav>


    </div>


    <div className={isTheme ? "" : "night"}>

</div>

</div>

  )
  }


export default Header