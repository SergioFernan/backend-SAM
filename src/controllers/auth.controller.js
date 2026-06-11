import { validatePassword } from "../helpers/bcrypt.helper.js"; // importo la función que compara la contraseña sin encriptar con la contraseña encriptada que se encuentra en la base de datos, devuelve true si son iguales y false si no lo son
import { generateToken } from "../helpers/jwt.helper.js";
import { dbGetUserByEmail } from "../services/user.service.js"; // importo la función que busca el email en la base de datos y devuelve el objeto

const loginUser = async (req, res) => {
    try {
    const inputData = req.body; // recibe un objeto con email y password por body
    if(!inputData.password){
        throw new Error(`password es requerido para login`) // lanza un error si no recibe una contraseña
    }
    const userFound = await dbGetUserByEmail(inputData.email); // busca el email en la base de datos y devuelve el objeto
    if (!userFound) { // si no encuentra el email en la base de datos devuelve un error 404
        return res.status(404).json({
            msj: `correo no existe`
        })
    }
    const isValid = validatePassword(inputData.password, userFound.password); // compara la contraseña sin encriptar con la contraseña encriptada que se encuentra en la base de datos, devuelve true si son iguales y false si no lo son
    if (!isValid) { // si la contraseña no es válida devuelve un error 401
        throw new Error(`credenciales no válidas`) // lanza un error si la contraseña no es válida
        }
    const payLoad = { // si la contraseña es válida, genera un token con el payload que contiene el id, el nombre, el email y el rol del usuario
        _id: userFound._id, // el id del usuario
        name: userFound.name, // el nombre del usuario
        email: userFound.email, // el email del usuario
        role: userFound.role, // el rol del usuario
        avatar: userFound.avatar, // el avatar del usuario
        status: userFound.status // el estado del usuario
    }
    const token = generateToken(payLoad); // genera un token con el payload, la clave secreta y el tiempo de expiración, devuelve el token
    if (!token === null) { // si no se pudo generar el token devuelve un error 500
        throw new Error(`error al generar token`) // lanza un error si no se pudo generar el token
    }
    const userFoundObj = userFound.toObject(); // convierte el objeto de mongoose a un objeto de javascript
    delete userFoundObj.password; // elimina la propiedad password del objeto para no enviarla en la respuesta
    res.json({
        msj: `login exitoso`,
        token,
        data: userFoundObj // devuelve el token y el objeto del usuario sin la contraseña
    })
}
catch (error) {
    console.error(error);
    if(error.message.includes(`credenciales no válidas`)
    ||error.message.includes(`password es requerido para login`)
    ||error.message.includes(`email es requerido para buscar usuario`)) { // si el error es por credenciales no válidas devuelve un error 401
        return res.status(401).json({
            msj: error.message
        })
    }
    if(error.message.includes(`error al generar token`)) { // si el error es por no poder generar el token devuelve un error 500
        return res.status(500).json({
            msj: error.message
        })
    }
    res.status(500).json({
        msj: `error al hacer login`
    })
}
}
const renewToken = async (req, res) => {
    // paso 1 obtenener los datos del usuario y carga util del midleware de autenticación, con estos datos se puede generar un nuevo token y devolverlo en la respuesta
    const payLoad = req.payload; // recibe el payload del token decodificado por el middleware de autenticación, este payload se encuentra en el request
    const user = req.user; // recibe el objeto del usuario encontrado por el middleware de autenticación, este objeto se encuentra en el request
    // paso 2 verificar que el usuario al que se le va a generar el nuevo token existe y esta activo
    const userFound = await dbGetUserByEmail(payLoad.email); // busca el email del payload en la base de datos, devuelve el objeto del usuario si lo encuentra o null si no lo encuentra
    if (!userFound) { // si no encuentra el email en la base de datos devuelve un error 404
        return res.status(404).json({
            msj: `no se renueva el token porque no se encuentra registro de ese usuario`
        })
    }
        // paso 3 generar un nuevo token con los datos del usuario, para esto se puede usar la función generateToken del helper de jwt, esta función recibe el payload, la clave secreta y el tiempo de expiración, devuelve el token
    const newPayLoad = { // genera un nuevo payload con el id, el nombre, el email y el rol del usuario
        _id: userFound._id, // el id del usuario
        name: userFound.name, // el nombre del usuario
        email: userFound.email, // el email del usuario
        role: userFound.role, // el rol del usuario
        avatar: userFound.avatar, // el avatar del usuario
        status: userFound.status // el estado del usuario
    }
    const newToken = generateToken(newPayLoad); // genera un nuevo token con el payload actualizado
    // paso 4 elimino propiedades sensibles
    const userFoundObj = userFound.toObject(); // convierte el objeto de mongoose a un objeto de javascript
    delete userFoundObj.password; // elimina la propiedad password del objeto para no enviarla en la respuesta
    delete userFoundObj.createdAt; // elimina la propiedad createdAt del objeto para no enviarla en la respuesta
    delete userFoundObj.updatedAt; // elimina la propiedad updatedAt del objeto para no enviarla en la respuesta
    delete userFoundObj.__v; // elimina la propiedad __v del objeto para no enviarla en la respuesta
    // paso 5 devuelvo el nuevo token y el objeto del usuario sin la contraseña en la respuesta
    res.json({
        msj: `token renovado exitosamente`,
        token: newToken,
        data: userFoundObj
    })
}
export { loginUser, renewToken };