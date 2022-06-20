import { axiosConfig } from "../config/axiosConfig";

export const obtenerTodos = () => {
    return axiosConfig.get(
        '/marcas'
    );
}

export const guardar = (marca) => {
    return axiosConfig.post('/marcas', marca);
}

export const editarPorId = (id, marca) => {
    return axiosConfig.put('/marcas/'+id, marca);
}