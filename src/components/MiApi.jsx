//Miapi.js
import { Spinner } from "reactstrap";
import React, { useState, useEffect } from 'react';
import moment from 'moment'
import 'moment/locale/es';
moment.locale('es');


const MiApi = () => {

    //Contador de la tabla para evitar errores de key
    const titulo = "Selecciona un feriado y visita Chile";
    const texto1 = "Listado de feriados de Chile";
    const texto2 = "Selecciona fechas para obtener descuentos";
    const [listaTareas, setListaTareas] = useState([]);
    const [buscarTarea, setBuscarTarea] = useState("");
    const [ordenarFecha, setOrdenarFecha] = useState("d");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        consultarFeriados();
    }, []);

    //Función que llama a la API, para obtener los datos y almacenarlos en la lista de tareas.
    const consultarFeriados = async () => {

        const url = 'https://api.victorsanmartin.com/feriados/en.json';
        const response = await fetch(url)
        const data = await response.json()
        setListaTareas(data['data']);
        setIsLoading(false);

    }

    //Función para ordenar las fechas de menor a mayor y viceversa.
    let sortFechas = () => {
        if (ordenarFecha === "a") {
            setOrdenarFecha("d");
            let orden = listaTareas.sort((a, b) => moment(a.date, "YYYY-MM-DD").unix() - moment(b.date, "YYYY-MM-DD").unix());
            setListaTareas(orden);
            //console.log(ordenarFecha);
            //console.log(listaTareas[0]);
            return true;
        }
        else {
            setOrdenarFecha("a");
            let ordenx = listaTareas.sort((a, b) => moment(b.date, "YYYY-MM-DD").unix() - moment(a.date, "YYYY-MM-DD").unix());
            setListaTareas(ordenx);
            //console.log(ordenarFecha);
            //console.log(listaTareas[0]);
            return true;
        }
    }
    //Función al escribir sobre el input del formulario
    const capturaBuscar = (e) => {
        setBuscarTarea(e.target.value)
    }
    //Función para filtrar la lista de tareas a partir del input de búsqueda.
    const filtrados = listaTareas.filter((tarea) => {
        if (tarea.length !== 0) {
            if (tarea.title.toUpperCase().includes(buscarTarea.toUpperCase())) {
                return true;
            }
        }
        return false;
    });

    //Impresión de listado a través de una tabla. 
    const procesarListado = (lista) => {

        let listado = lista.map((tarea, index) =>
            <tr key={index}>
                <td>{moment(tarea.date).format("DD/MM/YYYY")}</td>
                <td> {tarea.title} </td>
                <td> {tarea.extra} </td>
                <td> {tarea.inalienable === true ? "Obligatorio" : "Libre elección"} </td>

            </tr>
        )


        return listado;
    }

    //Función que determina si el botón de orden de fecha es hacia arriba o hacia abajo.
    let icono = () => {
        if (ordenarFecha === "a") return (<i className="fa-solid fa-sort-up text-light"></i>);
        else return (<i className="fa-solid fa-sort-down text-light"></i>);
    }

    if (isLoading) {
        return (
            <div style={{
                display: 'block', width: 700, padding: 30
            }}>
                <h4>Esperar mientras carga la página</h4>
                <Spinner style={{ width: '2rem', height: '2rem' }}
                    children={false} />
            </div>
        );
    }
    return (
        <div className="fondo rounded-3">
            <div className="bg-dark d-flex justify-content-between p-2 m-1 rounded-3">
                <p className="textoHeader text-light">{titulo}</p>
                <form>
                    <input className="busqueda rounded-3" id="busqueda" name="busqueda" value={buscarTarea} onChange={capturaBuscar} placeholder="Buscar títulos de feriados" />
                </form>
            </div>
            <div className='caja m-1'>
                <img className="estirar rounded-4" src={process.env.PUBLIC_URL + '/img/fondo.jpg'} alt="Imagen de fondo" />
                <h1 className='texto1'>{texto1}</h1>
                <p className='texto2'>{texto2}</p>
            </div>

            <table className="table table-striped table-bordered table-hover rounded">
                <thead>
                    <tr className="bg-dark rounded-3"><th className="text-light " scope="col">Fecha<button className="btn btn-dark" onClick={sortFechas}>{icono()}
                    </button></th ><th className="text-light align-middle" scope="col">Título del feriado</th>
                        <th className="text-light align-middle" scope="col">Tipo</th>
                        <th className="text-light align-middle" scope="col">Estado</th></tr></thead><tbody>
                    {(buscarTarea === "") ? procesarListado(listaTareas) : procesarListado(filtrados)}
                </tbody>
            </table>
            
        </div>
    )
}
export default MiApi;
