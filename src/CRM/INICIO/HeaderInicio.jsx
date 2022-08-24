import React from 'react'

function HeaderInicio() {
  return (
   
<div className='header-menu'>



<nav>
   <ul>

   <li class="sub-menu-parent" tab-index="0">
       <a href="/">Home</a>
      </li>
     <li class="sub-menu-parent" tab-index="0">
       <a href="/precios">Precios</a>
  {/*      <ul className="sub-menu">
         <li><a href="#">Demo</a></li>
         <li><a href="#">Paquetes</a></li>
   
       </ul> */}
     </li>
     <li class="sub-menu-parent" tab-index="0">
       <a href="/contacto">Contacto</a>
       <ul class="sub-menu">
         <li><a href="#">Email</a></li>
        
       </ul>
     </li>
     <li class="sub-menu-parent" tab-index="0">
       <a href="/login">Login</a>
      </li>
   </ul>
 </nav>


</div>
  )
}

export default HeaderInicio