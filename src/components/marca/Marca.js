import React, { useEffect, useState } from 'react'
import { obtenerTodos, guardar, editarPorId } from '../../services/MarcaService';



export default function Marca() {

  const [marcas, setMarcas] = useState([]);
  const [marca, setMarca] = useState({
    nombre: '',
    marca: false
  })
  const [error, setError] = useState(false);

  useEffect( () => {
    const getMarcas = () => {
        obtenerTodos().then(r => {
            console.log(r.data)
            setMarcas(r.data)
        }).catch(e => {
            console.log(e)
        })
    };
    getMarcas();
  }, []);

  const changeMarca = e => {
    setMarca({
      ...marca,
      [e.target.name]: e.target.value
    })
  }

  const add = e => {
    e.preventDefault();
    console.log(marca)
    guardarMarca();
  }

  const guardarMarca = () => {
    guardar(marca)
    .then(r => {
      if(r.marca){
        setMarcas([...marcas, r.data])
      }
      changeError(false);
    }).catch(e => {
      console.log(e);
      changeError(true);
    })
  }

  const closeModal = () => {
    setMarca({
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
              marcas.map((marc, index) => {
                const date = new Date(marc.fechaCreacion);
                const creacion = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay();
                return(
                <tr key={marc._id}>
                  <th scope="row">{index+1}</th>
                  <td>{marc.nombre}</td>
                  <td>{marc.estado ? 'Activo' : 'Inactivo'}</td>
                  <td>{creacion}</td>
                  <td>{marc.fechaActualizacion}</td>
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
                    value={marca.nombre}
                    onChange={changeMarca}
                    name="nombre"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">Estado:</label>
                  <select 
                    required
                    className="form-select" 
                    aria-label="Default select example"
                    value={marca.marca}
                    onChange={changeMarca}
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
