import React from 'react'
import "./css/footer.css"



function Footer() {
    return (
  
//============ Footer Página Web ============
        <div className="footer">
            
{/* //============ Redes Sociales ============ */}
            <div className="redes-sociales">
                <h4>
                    <a href= {"#"} target="_blank" rel="noreferrer" > <i className="bi bi-telephone-fill"></i></a>
                    <a href={"#"} target="_blank" rel="noreferrer" >    <i className="bi bi-geo-alt-fill"></i> </a>
                    <a href={"#"} target="_blank" rel="noreferrer"> <i className="bi bi-envelope-fill"></i></a>
                    <a href={"#"} target="_blank" rel="noreferrer" > <i className="bi bi-linkedin"></i> </a>
                </h4>
            </div>
                 <div className="box1">
                    <h3>Marvilop</h3>
                 </div>
        </div>
    )
}

export default Footer