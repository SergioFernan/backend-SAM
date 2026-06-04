import { validatepassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";
import { dbGetUserByEmail } from "../services/user.service.js";

const loginUser = async (req, res) => {



    // paso 1: extraer los datos del cuerpo de la peticion (email, password)
    const inputData = req.body; // recibe el body email, password

    // paso 2: validar que el email y password existen en la base de datos
    // si el email no existe, devolver un error 404
    // si el password no coincide con el email, devolver un error 401
    const userFound = await dbGetUserByEmail(inputData.email); // busca el email en la base de datos
    if (!userFound) {
        return res.status(400).json({
            msg: `email no encontrado. registrese para iniciar sesión`
        });
    }

    // paso 3: si el email y password son correctos, generar un token de autenticación (JWT) y devolverlo en la respuesta
    const isValid = validatepassword(inputData.password, userFound.password);

    if (!isValid) {
        return res.status(400).json(
            {
                msg: `Sus credenciales no son validas`
            });
    }
    // invoa la funcionalidad de generar el token JWT (aun no implementada) y devolverlo en la respuesta
    const payload = {
        _id: userFound._id,
        name: userFound.name,
        email: userFound.email,
    };

    const token = generateToken(payload);

//Paso 5: Convertir un BJSON a json para ELIMINAR la contraseña del usuario encontrado antes de enviarlo en la respuesta
const userFoundObjt = userFound.toObject(); // convierte el BSON a JSON
delete userFoundObjt.password; // elimina la propiedad password del objeto JSON


    // Paso: 6 Responde al cliente enviandole el Token
    res.json
        ({
            msg: `Usuario autenticado correctamente`,
            token, // Es igual que escribir token: token, pero como el nombre de la variable es el mismo que el nombre de la propiedad, se puede omitir la repetición
            data: userFoundObjt, // Devuelve los datos del usuario encontrado (sin la contraseña)
         });

}

export { loginUser }; 