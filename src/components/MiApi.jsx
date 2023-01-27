//Miapi.js
import React, { useState, useEffect} from 'react';
import moment from 'moment'
import 'moment/locale/es';
moment.locale('es');


const MiApi = () => {

    //Contador de la tabla para evitar errores de key
    const titulo = "Selecciona un feriado y visita Chile";
    const texto1 ="Listado de feriados de Chile";
    const texto2 ="Selecciona fechas para obtener descuentos";
    const [listaTareas, setListaTareas] = useState([]);
    const [buscarTarea, setBuscarTarea] = useState("");
    
    useEffect(() => {
        consultarFeriados();
        }, []);

    const consultarFeriados = async () => {
        const url = 'https://api.victorsanmartin.com/feriados/en.json';
        const response = await fetch(url)
        const data = await response.json()
        setListaTareas(data['data']);
    }
            
    //Función al escribir sobre el input del formulario
    
    const capturaBuscar = (e) => {
        setBuscarTarea(e.target.value)
    }
    
    const filtrados = listaTareas.filter((tarea) => {
        if (tarea.length !== 0) {
            if (tarea.title.toUpperCase().includes(buscarTarea.toUpperCase())) {
                return true;
            }
        }
            return false;
    });

    //Función que ordena listas for fecha
    let ordenFecha =(lista)  =>{
        if (lista.length !== 0) {
            lista = lista.sort((a, b) => moment(a.date, "YYYY-MM-DD").unix() - moment(b.date, "YYYY-MM-DD").unix());
        }
    }

    const procesarListado= (lista) => {
        ordenFecha(lista);
        let listado=lista.map((tarea, index) =>
            <tr key={index}>
                <td>{moment(tarea.date).format("DD/MM/YYYY")}</td>
                <td> {tarea.title} </td>
                <td> {tarea.extra} </td>
                <td> {tarea.inalienable===true? "Obligatorio": "Libre elección"} </td>
                
            </tr>
        )   
        return listado;
    }


    return (
        <div className="fondo">
            <div className="bg-dark d-flex justify-content-between p-2 m-1">
                <p className="textoHeader text-light">{titulo}</p>
                <form>
                    <input className="busqueda" id="busqueda" name="busqueda" value={buscarTarea} onChange={capturaBuscar} placeholder="Buscar títulos de feriados" />
                </form>
            </div>
            <div className='caja m-1'>
                <img className="estirar" src={process.env.PUBLIC_URL + '/img/fondo.jpg'} alt="Imagen de fondo" />  
                <h1 className='texto1'>{texto1}</h1>
                <p className='texto2'>{texto2}</p>
            </div>
            
            <table className="table table-striped table-bordered table-hover">
                <tbody >
                    <tr className="bg-dark"><th className="text-light" scope="col">Fecha</th ><th className="text-light" scope="col">Título del feriado</th>
                    <th className="text-light" scope="col">Tipo</th>
                    <th className="text-light" scope="col">Estado</th></tr>
                    {(buscarTarea === "") ? procesarListado(listaTareas) : procesarListado(filtrados)}
                </tbody>
            </table>
            
        </div>
    )
}
export default MiApi;
