//Miapi.js
import React, { useState, useEffect} from 'react';
import moment from 'moment'
import 'moment/locale/es';
moment.locale('es');


const MiApi = () => {

    //Contador de la tabla para evitar errores de key
    let i=1;
    const [listaTareas, setListaTareas] = useState([]);
    const titulo = "Buscador títulos de feriados";
    const [buscarTarea, setBuscarTarea] = useState("");

    useEffect(() => {fetch('https://api.victorsanmartin.com/feriados/en.json')
            .then((response) => response.json())
            .then((data) => {
                setListaTareas(data['data']);
               // console.log(data['data']);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

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
    let ordenFecha =(lista, text)  =>{

        if (lista.length !== 0) {
            lista = lista.sort((a, b) => moment(a.date, "YYYY-MM-DD").unix() - moment(b.date, "YYYY-MM-DD").unix());
            console.log(text, " With moment js: \n", lista);
        }
    }
    ordenFecha(listaTareas,"Lista de tareas.");
    ordenFecha(filtrados,"Lista de filtrados");

    return (
        <div className="w-100">
            <div className="w-100 bg-dark d-flex justify-content-between p-2">
                <p className="textoHeader text-light">{titulo}</p>
                <form >
                    <input className="buscador" id="buscador" name="buscador" value={buscarTarea} onChange={capturaBuscar} placeholder="Buscar títulos de feriados" />
                </form>

            </div>
            <h1>Listado de feriados</h1>
            <table className="table table-striped table-bordered table-hover" id="sortTable">
                <tbody key={i}>
                    <tr className="bg-dark" key={i = i + 1}><th className="text-light" scope="col">Fecha</th ><th className="text-light" scope="col">Título del feriado</th>
                    <th className="text-light" scope="col">Tipo</th>
                    <th className="text-light" scope="col">Estado</th></tr>
                    {(buscarTarea === "") ? listaTareas.map((tarea, index) =>
                        <tr key={i = i + 1}>
                            <td>{moment(tarea.date).format("DD/MM/YYYY")} </td>
                            <td> {tarea.title} </td>
                            <td> {tarea.extra} </td>
                            <td> {tarea.inalienable===true? "Obligatorio": "Libre elección"} </td>
                            
                        </tr>
                    )
                        :
                        filtrados.map((tarea, index) =>
                            <tr key={i = i + 1}>
                                <td>{moment(tarea.date).format("DD/MM/YYYY")} </td>
                            <td> {tarea.title} </td>
                            <td> {tarea.extra} </td>
                            <td> {tarea.inalienable===true? "Obligatorio": "Libre elección"} </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            
        </div>
    )
}
export default MiApi;
