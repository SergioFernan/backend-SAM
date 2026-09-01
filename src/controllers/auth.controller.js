import { validatepassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";
import { dbGetUserByEmail } from "../services/user.service.js";

const loginUser = async (req, res) => {
    try {
        // paso 1: extraer los datos del cuerpo de la peticion (email, password)
        const inputData = req.body;

        if (!inputData || !inputData.email || !inputData.password || typeof inputData.email !== 'string') {
            return res.status(401).json({
                msg: "Credenciales inválidas o incompletas"
            });
        }

        // paso 2: validar que el email y password existen en la base de datos
        // si el email no existe o el password es incorrecto, devolver 401
        const userFound = await dbGetUserByEmail(inputData.email);
        if (!userFound) {
            return res.status(401).json({
                msg: "Credenciales inválidas (email no encontrado)"
            });
        }

        // paso 3: si el email y password son correctos, generar un token de autenticación (JWT) y devolverlo en la respuesta
        const isValid = validatepassword(inputData.password, userFound.password);

        if (!isValid) {
            return res.status(401).json({
                msg: "Credenciales inválidas (contraseña incorrecta)"
            });
        }
        
        // invoa la funcionalidad de generar el token JWT con role incluido
        const payload = {
            _id: userFound._id,
            name: userFound.name,
            email: userFound.email,
            role: userFound.role,
        };

        const token = generateToken(payload);

        // Paso 5: Convertir un BJSON a json para ELIMINAR la contraseña del usuario encontrado antes de enviarlo en la respuesta
        const userFoundObjt = userFound.toObject(); // convierte el BSON a JSON
        delete userFoundObjt.password; // elimina la propiedad password del objeto JSON

        // Paso: 6 Responde al cliente enviandole el Token
        // Si el user tiene role BAR, barId ya viene populado desde el service (dbGetUserByEmail usa .populate('barId'))
        res.status(200).json({
            msg: `Usuario autenticado correctamente`,
            token, // Es igual que escribir token: token
            data: userFoundObjt, // Devuelve los datos del usuario incluyendo role y barId (sin la contraseña)
        });

    } catch (error) {
        console.error("Error en loginUser:", error);
        // Retornamos 401 de manera controlada para nunca devolver un 500
        return res.status(401).json({
            msg: "Error de autenticación"
        });
    }
}

export { loginUser };