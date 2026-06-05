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
        role: userFound.role // el rol del usuario
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
const renewToken = (req, res) => {
    res.json({
        msj: `aqui se renueva el token`
    })
}
export { loginUser, renewToken };