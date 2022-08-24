import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {url2} from '../../Componentes/Ocultar';
import Cookies from 'universal-cookie';




import CreateIcon from "@material-ui/icons/Create";
import {
	Box, Button, Snackbar, Table,
	TableBody, TableCell, TableHead, TableRow
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";
import FunctionsIcon from '@material-ui/icons/Functions';
import AutorenewIcon from '@material-ui/icons/Autorenew';



import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { InsertDatosCats } from '../../Preventa/PTN-BOM/Routes/GuardarDatosCategorias';
/*============== Operacions PTN BOM ==============*/
import { precioUnitario, calcularDescuento, Total}  from '../../Preventa/PTN-BOM/Operaciones/Operaciones';



const cookies = new Cookies();
let validatorid = cookies.get('id_usuario');
let validaOperacion = false;


var define = "";




// Creating styles
const useStyles = makeStyles({
	root: {
		"& > *": {
			borderBottom: "unset",
		
		},
	},
	table: {
		minWidth: 100,
	},
	snackbar: {
		bottom: "140px",
	},

});






function CargaDatos(props) {

	// Defining a state named rows
	// which we can update by calling on setRows function
	const [rows, setRows] = useState([
		{ id: 1,
		  n_parte: "",
		  descripcion: "",
		  meses: "" ,
		  semanas: "" ,
		  cantidad:1,
		  precio_lista: 0,
		  precio_unitario: 0,
		  descuento: 0, 
		  total:0 ,
		  moneda:"", 
		  categoria:"", 
		  comentarios: ""		
		},
	]);

	//Key 
	const [k, setK] = useState(0);


    function checa(){
        validaOperacion = !validaOperacion;
        setBdesc(!Bdesc);
        setBdesc2(!Bdesc2);
        setDatos({
            precio_lista: '',
            precio_unitario: '',
            precio_descuento: '',
            cd_cantidad: '',
            precio_total: '' 
			
			

        });
        }

		
		if( validaOperacion === false){
          define = "Descuento";
		}else{
			define = "Precio Unitario	";
		}
		const [datos, setDatos] = useState({
			precio_lista: '',
			precio_unitario: '',
			precio_descuento: '',
			cd_cantidad: '',
			precio_total: '',
			precio_id_moneda:''
		});

		const handleInputChangePrecio = (event) => {
			setDatos({
			...datos,[event.target.name]: event.target.value,
			});
		};
	
		
		///CALCULAR DESCUENTO
		/*================================================================================*/
		// useEffect(()=>{
		// if(datos.precio_lista !=='' && datos.precio_unitario !==''  && validaOperacion === false){
		// 	const desc = calcularDescuento(datos.precio_lista, datos.precio_unitario);
		// 	const total = Total(datos.precio_unitario,datos.cd_cantidad)
		// 	setDatos({ ...datos,  precio_total:   total, precio_descuento: desc });}
		
		// if(datos.precio_lista === '' || datos.precio_unitario === ''){
		// 	setDatos({ ...datos,  precio_descuento:''});
		// }

		// },[datos.sp_cantidad,datos.precio_lista,datos.precio_unitario   ])

		useEffect(()=>{
			if(rows[k].precio_lista != '' && rows[k].precio_unitario != ''  && validaOperacion == false){
				const desc = calcularDescuento(rows[k].precio_lista, rows[k].precio_unitario);
				const total = Total(rows[k].precio_unitario,rows[k].cantidad);
				console.log(k);
				let i =parseInt(k)
				
				const change = rows.map(elemento=>(
					elemento.id === i+1 ?    elemento : ''

				))
				change[i].total=total
				change[i].descuento=desc
				console.log(change[i])

				//rows[k].total = total;
				//rows[k].descuento = desc;
				// setRows({
				// 	...rows, total:total, descuento:desc
				// });
				setRows(change);
			}
			
			if(rows[k].precio_lista === '' || rows[k].precio_unitario === ''){
				//setDatos({ ...rows[k],  precio_descuento:''});
				//rows[k].descuento = 0;
				// setRows({
				// 	...rows[k], descuento:''
				// });
			}
		},[rows[k].cantidad,rows[k].precio_lista,rows[k].precio_unitario])
	
	
	///CALCULAR PRECIO UNITARIO
		  /*===================================================================================================================*/
		  useEffect(()=>{
			let precio_u='';
			if (datos.precio_lista !== '' &&  datos.precio_descuento !== ''  &&  validaOperacion ===true) {
			  precio_u = precioUnitario(datos.precio_lista, datos.precio_descuento);
			  const total = Total(precio_u, datos.cd_cantidad);
			  if( datos.precio_descuento < 0 || datos.precio_descuento > 100 ){
			  // alert("Advertencia Porcentaje Invalido")
			  }
			  setDatos({ ...datos, precio_total:total,precio_unitario:precio_u});
			}
		  
		  },[datos.precio_descuento,datos.precio_lista,datos.sp_cantidad])
	
		  //OBTENER TOTALES
	
	//checar
			   /*===================================================================================================================*/
			   
		/*===================================================================================================================*/
		/*=============================================================================================================*/
		const {enviarDatos,handleInputChange2,finalizarProy} = InsertDatosCats();
		const [modalShow, setModalShow] = useState(false);
		const [DatosCat, SetDatosCat] = useState([])
		const[ Bdesc, setBdesc]= useState(true);
		const[ Bdesc2, setBdesc2]= useState(false);
		const lista = async (clave) =>{
			try {
				const respuesta = await axios.get(url2+`/api/cotizador/catd/view/modal/${clave}`);
				SetDatosCat(respuesta.data.data)
				
			} catch (error) {
				console.log(error);            
			}
			
		}
	   const send =(e,datos)=>{
		enviarDatos(e, datos);
		setDatos({
			precio_lista: '',
			precio_unitario: '',
			precio_descuento: '',
			cd_cantidad: '',
			precio_total: '',
			precio_id_moneda:''
		});
	
	   }
	
	   function confirFinalizar(){
		const confirmacion = window.confirm(
			"¿Seguro que quieres Finalizar este Proyecto?"
		  );
		  if(confirmacion){
			finalizarProy()
		  }else{
	
		  }
		
	   }
		
	// Creating style object
	const classes = useStyles();

	

	// Initial states
	const [open, setOpen] = React.useState(false);
	const [isEdit, setEdit] = React.useState(false);
	const [disable, setDisable] = React.useState(true);
	const [showConfirm, setShowConfirm] = React.useState(false);

	// Function For closing the alert snackbar
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	// Function For adding new row object
	const handleAdd = () => {
		setRows([
			...rows,
			{		
		id: rows.length + 1   , n_parte: "", descripcion: "", meses: "" , semanas: "" , 
		cantidad:1, precio_lista: 0, precio_unitario: 0, descuento:0, total:0 ,
        moneda:"", categoria:"", comentarios: "",
	 
			},
		]);
		setEdit(true);
	};


	

	// Function to handle edit
	const handleEdit = (i) => {
		// If edit mode is true setEdit will
		// set it to false and vice versa
		setEdit(!isEdit);
	};

	// Function to handle save
	const handleSave = () => {
		setEdit(!isEdit);
		setRows(rows);
		console.log("Guardado: ", rows);
		setDisable(true);
		setOpen(true);
	};

	// The handleInputChange handler can be set up to handle
	// many different inputs in the form, listen for changes
	// to input elements and record their values in state
	const handleInputChange = (e, index) => {
		//console.log('Index:',index);
		setK(index);
		setDisable(false);
		const { name, value } = e.target;
		const list = [...rows];
		list[index][name] = value;
		setRows(list);
		//console.log('list:',list)
		//console.log('Rows:',rows);
	};

	// Showing delete confirmation to users
	const handleConfirm = () => {
		setShowConfirm(true);
	};

	// Handle the case of delete confirmation where
	// user click yes delete a specific row of id:i
	const handleRemoveClick = (i) => {
		const list = [...rows];
		list.splice(i, 1);
		setRows(list);
		setShowConfirm(false);
	};

	// Handle the case of delete confirmation
	// where user click no
	const handleNo = () => {
		setShowConfirm(false);
	};

return (


 
	<TableBody>
	<Snackbar
		open={open}
		autoHideDuration={2000}
		onClose={handleClose}
		className={classes.snackbar}
	>
		<Alert onClose={handleClose} severity="success">
	Guardado
		</Alert>
	</Snackbar>
	<Box margin={10} >
		<div style={{ display: "flex", justifyContent: "space-between" }}>
		<div>
			{isEdit ? (
			<div>
				<Button onClick={handleAdd}>
				<AddBoxIcon onClick={handleAdd} />
		            	Agregar
				</Button>
				{rows.length !== 0 && (
				<>
					{disable ? (
					<Button disabled align="right" onClick={handleSave}>
						<DoneIcon />
						Guardar
					</Button>
					) : (
					<Button align="right" onClick={handleSave}>
						<DoneIcon />
				    	Guardar
					</Button>
					)}


					
               <Button align="right"   onClick={checa}>
				<AutorenewIcon />
		     	<span> = Calcular  {define}    </span>
				 </Button>
				</>


				)}
			</div>
			) : (
			<div>
				<Button onClick={handleAdd}>
				<AddBoxIcon onClick={handleAdd} />
				Añadir
				</Button>

				<Button align="right" onClick={handleEdit}>
				<CreateIcon />
		     	Editar
				</Button>


				<Button align="right"   onClick={checa}>
				<AutorenewIcon />
		     	<span> Calcular  {define}    </span>
			
				</Button>



			</div>
			)}
		</div>
		</div>
	

		

		<Table
		className={classes.table}
		size="small"
		aria-label="a dense table"
		>
		<TableHead>
			<TableRow>
			<TableCell  align="center">N° Parte</TableCell>
			<TableCell  align="center">Descripción</TableCell>
			<TableCell  align="center">Meses</TableCell>
			<TableCell  align="center">Semanas</TableCell>
			<TableCell  align="center">Cantidad</TableCell>
			<TableCell  align="center">Precio Lista Unitario</TableCell>
			<TableCell  align="center">Precio Unitario</TableCell>
			<TableCell  align="center">Descuento</TableCell>
			<TableCell  align="center">Total</TableCell>
			<TableCell  align="center">Moneda</TableCell>
			<TableCell  align="center">Categoria</TableCell>
			<TableCell  align="center">Comentarios</TableCell>
			<TableCell  align="center">X</TableCell>



		{/* 	id: rows.length + 1, n_parte: "", descripcion: "", meses: "" , semanas: "" , 
		cantidad:0, precio_lista: 0, precio_unitario: 0, descuento:0, total:0 ,
        moneda:"", proveedor:"", marca: "", comentarios: "",
 */}
			</TableRow>
		</TableHead>
		
			{rows.map((row, i) => {
			return (
				<TableBody key={i}>
				<>
				<TableRow  >
					{isEdit ? (
					<>
						<TableCell padding="none">
					{/* 	<input
						    className="agregar"
							value={row.n_parte}
							name="n_parte"
							onChange={(e) => handleInputChange(e, i)}
						/> */}

                        <input
                        className="agregar"
                        type="text"
                        name="n_parte"
						onChange={(e) => handleInputChange(e, i)}
                        placeholder="No. Parte"
						value={row.n_parte}
                        />
						</TableCell>
						<TableCell padding="none">
						<input
                        className="agregar"
                        type="text"
						name="descripcion"
						onChange={(e) => handleInputChange(e, i)}
                        placeholder="Descripción"
						value={row.descripcion}
                        />
						{/* <input
					        className="agregar"
							value={row.descripcion}
							name="descripcion"
							onChange={(e) => handleInputChange(e, i)}
						/> */}
						</TableCell>

						<TableCell padding="none">

						<input
                        className="agregar"
                        type="number"
						name="meses"
                        min="0"
						onChange={(e) => handleInputChange(e, i)}
                        placeholder="Meses"
						value={row.meses}
                        />
					{/* 	<input
						    className="agregar"
							value={row.meses}
							name="meses"
							onChange={(e) => handleInputChange(e, i)}
						/> */}
						</TableCell>
						<TableCell padding="none">
						<input
                        className="agregar"
                        type="number"
                        name="semanas"
                        min="0"
						onChange={(e) => handleInputChange(e, i)}
                        placeholder="Semanas"
							value={row.semanas}
                        />
					{/* 	<input
					        className="agregar"
							value={row.semanas}
							name="semanas"
							onChange={(e) => handleInputChange(e, i)}
						/> */}
						</TableCell>

						<TableCell padding="none">
						<input
                        className="agregar"
                        type="number"
                        name="cantidad"
                    	value={rows[i].cantidad}
						onChange={(e) => handleInputChange(e, i)}
               
                        placeholder="Cantidad "
                        
                        />
					{/* 	<input
						    className="agregar"
							value={rows[i].cantidad}
							name="camtidad"
							onChange={(e) => handleInputChange(e, i)}
						/> */}
						</TableCell>
						<TableCell padding="none">

						<input
                        className="agregar"
                        type="number"
                        name="precio_lista"
                        value={rows[i].precio_lista}
						onChange={(e) => handleInputChange(e, i)}
                    
                        placeholder="Precio Lista"
                        
                        />
					{/* 	<input
					        className="agregar"
							value={rows[i].precio_lista}
							name="precio_lista"
							onChange={(e) => handleInputChange(e, i)}
						/> */}
						</TableCell>

						<TableCell padding="none">
						<input
                        className="agregar"
                        type="number"
                        value={rows[i].precio_unitario}
                        name="precio_unitario"
						onChange={(e) => handleInputChange(e, i)}
                        
                        placeholder="Precio unitario"
                        step="any"
                        disabled={Bdesc2}
                        />
					{/* 	<input
						    className="agregar"
							value={rows[i].precio_unitario}
							name="precio_unitario"
							onChange={(e) => handleInputChange(e, i)}
						/> */}
						</TableCell>
						<TableCell padding="none">

						<input
                        className="agregar"
                        type="number"
                        value={rows[i].descuento}
                        name="precio_descuento"
						onChange={(e) => handleInputChange(e, i)}
                        
                        placeholder="Descuento"
                        min="0"
                        step="any"
                        disabled ={Bdesc}
                        />
						{/* <input
					        className="agregar"
							value={rows[i][i].descuento}
							name="descuento"
							onChange={(e) => handleInputChange(e, i)}
						/> */}
						</TableCell>


						<TableCell padding="none">

						<input
                        className="agregar"
                        type="text"
                        name="total"
                        value={rows[i].total}
                        readOnly
                        placeholder="Total"
                        step="any"
                        />
						{/* <input
						    className="agregar"
							value={rows[i].total}
							name="total"
							onChange={(e) => handleInputChange(e, i)}
						/> */}
						</TableCell>
						<TableCell padding="none">
						<select id="combo-box" 
							value={row.moneda}
							name="moneda"
					        onChange={(e) => handleInputChange(e, i)}
                        >
                            <option value={0}></option>
                            <option value={1}>MXN</option>
                            <option value={2}>USD</option>
                        </select>
					{/* 	<input
					        className="agregar"
							value={row.moneda}
							name="moneda"
							onChange={(e) => handleInputChange(e, i)}
						/> */}
						</TableCell>

						<TableCell padding="none">
						<select
					    style={{ width: "170px" }}
						 id="combo-box"
						  name="categoria" 
						  value={row.categoria}
						  	onChange={(e) => handleInputChange(e, i)}>
                            <option value={0}></option>
                            <option value={1}>Capacitación</option>
                            <option value={2}>Accesorios</option>
                            <option value={3}>Servicios PTN</option>
                            <option value={4}>Mesa de Ayuda</option>                       
                        </select>
					{/* 	<input
						    className="agregar"
							value={row.proveedor}
							name="proveedor"
							onChange={(e) => handleInputChange(e, i)}
						/> */}
						</TableCell>
					



						<TableCell padding="none">

					        	<input
                                className="agregar"
                                type="text"
                                name="comentarios"
                            	onChange={(e) => handleInputChange(e, i)}
                                placeholder="Comentarios"
								value={row.comentarios}
                                />
                            
					{/* 	<input
						    className="agregar"
							value={row.comentarios}
							name="comentarios"
							onChange={(e) => handleInputChange(e, i)}
						/> */}
						</TableCell>
						{/* <TableCell padding="none">
						<input
					        className="agregar"
							value={row.descripcion}
							name="descripcion"
							onChange={(e) => handleInputChange(e, i)}
						/>
						</TableCell> */}




















						
					{/* 	<TableCell padding="none">
						<select
							style={{ width: "100px" }}
							name="meses"
							value={row.city}
							onChange={(e) => handleInputChange(e, i)}
						>
							<option value=""></option>
							<option value="Karanja">Delfos</option>
							<option value="Hingoli">Hingoli</option>
							<option value="Bhandara">Bhandara</option>
							<option value="Amaravati">Amaravati</option>
							<option value="Pulgaon">Pulgaon</option> 
						</select>
						</TableCell> */}



					</>
					) : (
					<>
						<TableCell component="th" scope="row" align="center">
						{row.n_parte}
						</TableCell>
						<TableCell component="th" scope="row"  align="center">
						{row.descripcion}
						</TableCell>
						<TableCell component="th" scope="row" align="center">
						{row.meses}
						</TableCell>
						<TableCell component="th" scope="row" align="center">
						{row.semanas}
						</TableCell>
						<TableCell component="th" scope="row"  align="center">
						{row.cantidad}
						</TableCell>
						<TableCell component="th" scope="row" align="center">
						{row.precio_lista}
						</TableCell>
						<TableCell component="th" scope="row" align="center">
						{row.precio_unitario}
						</TableCell>
						<TableCell component="th" scope="row"  align="center">
						{row.descuento}
						</TableCell>
						<TableCell component="th" scope="row" align="center">
						{row.total}
						</TableCell>
						<TableCell component="th" scope="row" align="center">
						{row.moneda}
						</TableCell>
						<TableCell component="th" scope="row"  align="center">
						{row.categoria}
						</TableCell>
						<TableCell component="th" scope="row" align="center">
						{row.comentarios}
						</TableCell>
					</>
					)}
					{isEdit ? (
					<Button className="mr10" onClick={handleConfirm}>
						<ClearIcon />
					</Button>

					


					) : (
					<Button className="mr10" onClick={handleConfirm}>
						<DeleteOutlineIcon />
					</Button>


					)}


					{showConfirm && (
					<>
						<Dialog
						open={showConfirm}
						onClose={handleNo}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
						>
						<DialogTitle id="alert-dialog-title">
							{"Confirmar Eliminación"}
						</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
							Estas Seguro de Eliminar está Fila de Datos?
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button
							onClick={() => handleRemoveClick(i)}
							color="primary"
							autoFocus
							>
							Si
							</Button>
							<Button
							onClick={handleNo}
							color="primary"
							autoFocus
							>
							No
							</Button>
						</DialogActions>
						</Dialog>
					</>
					)}
				</TableRow>
				</>
				</TableBody>
			);
			})}
	
		</Table>
	</Box>
	</TableBody>



  
);


}

export default CargaDatos;