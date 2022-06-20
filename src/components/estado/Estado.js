import React, { useEffect, useState } from 'react'
import { obtenerTodos, guardar, editarPorId } from '../../services/EstadoService';

export default function Estado() {

  const [estados, setEstados] = useState([]);
  const [estado, setEstado] = useState({
    nombre: '',
    estado: false
  })
  const [error, setError] = useState(false);

  useEffect( () => {
    const getEstados = () => {
        obtenerTodos().then(r => {
            console.log(r.data)
            setEstados(r.data)
        }).catch(e => {
            console.log(e)
        })
    };
    getEstados();
  }, []);

  const changeEstado = e => {
    setEstado({
      ...estado,
      [e.target.name]: e.target.value
    })
  }

  const add = e => {
    e.preventDefault();
    console.log(estado)
    guardarEstado();
  }

  const guardarEstado = () => {
    guardar(estado)
    .then(r => {
      if(r.estado){
        setEstados([...estados, r.data])
      }
      changeError(false);
    }).catch(e => {
      console.log(e);
      changeError(true);
    })
  }

  const closeModal = () => {
    setEstado({
      nombre: '',
      estado: false
    })
    changeError(false);
  }

  const changeError = e => {
    setError(e);
  }

  return (
    <div className="container">
      <button 
        type="button"
        className="btn btn-outline-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <i className="fa-solid fa-plus"></i>
         Agregar
      </button>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Estado</th>
              <th scope="col">Fecha creación</th>
              <th scope="col">Fecha actualización</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {
              estados.map((est, index) => {
                const date = new Date(est.fechaCreacion);
                const creacion = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay();
                return(
                <tr key={est._id}>
                  <th scope="row">{index+1}</th>
                  <td>{est.nombre}</td>
                  <td>{est.estado ? 'Activo' : 'Inactivo'}</td>
                  <td>{creacion}</td>
                  <td>{est.fechaActualizacion}</td>
                  <td>
                    <button
                      type="button" 
                      className="btn btn-outline-success"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>-
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline-danger"
                    >
                      <i className="fa-solid fa-trash"></i>
                      -
                    </button>
                  </td>
                </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"   aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Nuevo Estado</h5>
              <button 
                type="button" 
                className="btn-close" 
                data-bs-dismiss="modal" 
                aria-label="Close"
                onClick={closeModal}
              >
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={add}>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">Nombre:</label>
                  <input
                    required
                    type="text" 
                    className="form-control" 
                    value={estado.nombre}
                    onChange={changeEstado}
                    name="nombre"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">Estado:</label>
                  <select 
                    required
                    className="form-select" 
                    aria-label="Default select example"
                    value={estado.estado}
                    onChange={changeEstado}
                    name="estado"
                  >
                    <option value={true}>Activo</option>
                    <option value={false}>Inactivo</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <div className={error ? 'alert alert-danger': 'd-none'} role="alert">
                    ¡Ha ocurrido un error!
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    data-bs-dismiss="modal"
                    onClick={closeModal}
                  >
                    Cerrar
                  </button>
                  <button type="submit" className="btn btn-primary">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
