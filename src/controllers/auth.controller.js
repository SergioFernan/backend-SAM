import { validatePassword } from "../helpers/bcrypt.helper.js";
import { dbGetUserByEmail } from "../services/user.service.js"; // importo la función que busca el email en la base de datos y devuelve el objeto

const loginUser = async (req, res) => {
    const inputData = req.body; // recibe un objeto con email y password por body
    const userFound = await dbGetUserByEmail(inputData.email); // busca el email en la base de datos y devuelve el objeto
    if (!userFound) { // si no encuentra el email en la base de datos devuelve un error 404
        return res.status(404).json({
            msj: `correo no existe`
        })
    }
    const isValid = validatePassword(inputData.password, userFound.password); // compara la contraseña sin encriptar con la contraseña encriptada que se encuentra en la base de datos, devuelve true si son iguales y false si no lo son
    if (!isValid) { // si la contraseña no es válida devuelve un error 401
        return res.status(401).json({
            msj: `sus credenciales no son válidas, intente nuevamente`
        })
    }
    res.json({
        msj: `login de usuario`
    })
}

export { loginUser };