// Middleware que se encarga de eliminar el campo role del body de la peticion
const removeRole = (req, res, next) => {
    const inputData = req.body; // Desestructuration (ES2015)

    delete inputData.role; // Eliminacion de propiedad

    next(); // Permite el paso a la siguiente funcion
}


export {
    removeRole
}
