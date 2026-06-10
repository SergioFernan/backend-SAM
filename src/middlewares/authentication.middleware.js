import { verifyToken } from "../helpers/jwt.helper.js";
import { dbGetUserByEmail } from "../services/user.service.js";

const authenticationUser = async (req, res, next) => {
    // paso 1 recibir el token por header
    const token = req.header(`X-Token`); // recibe el token por header
    if (!token) { // si no recibe un token devuelve un error 401
        return res.status(401).json({
            msj: `cadena de token vacia`
        })
    }
    //paso 2 verificar que el token tenga el formato correcto, el formato correcto es "Bearer token"
    const tokenParts = token.split(`.`); // separa el token en partes, el formato correcto
    if (tokenParts.length !== 3) { // si el token no tiene 3 partes devuelve un error 401
        return res.status(401).json({
            msj: `formato de token no válido`
        })
    }
    // paso 3 verificar que el token sea válido, para esto se puede usar la función verifyToken del helper de jwt, esta función recibe el token y la clave secreta, devuelve el payload si el token es válido o lanza un error si no lo es
    const payload = verifyToken(token); // verifica el token con la clave secreta, devuelve el payload si el token es válido o lanza un error si no lo es
    if(!payload) { // si el token no es válido devuelve un error 401
        return res.status(401).json({
            msj: `token no válido`
        })
    }
    // paso 4 buscar el email del payload en la base de datos, para esto se puede usar la función dbGetUserByEmail del servicio de usuario, esta función recibe el email y devuelve el objeto del usuario si lo encuentra o null si no lo encuentra
    const userFound =await dbGetUserByEmail(payload.email); // busca el email del payload en la base de datos, devuelve el objeto del usuario si lo encuentra o null si no lo encuentra
    // verifica si el usuario existe o esta ihabilitado, si no encuentra el email en la base de datos devuelve un error 401
    if (!userFound) { // si no encuentra el email en la base de datos devuelve un error 401
        return res.status(401).json({
            msj: `no es posiblre generar el nuevo token`
        })
    }
    // paso 5: eliminar las propiedades innecesarias para crear el payload del token, por ejemplo la contraseña, el rol, etc. y agregar el objeto del usuario al request para que esté disponible en los controladores
    const userFoundObj = userFound.toObject(); // convierte el objeto de mongoose a un objeto de javascript
    delete userFoundObj.password; // agrega el objeto del usuario al request para que esté disponible en los controladores
    delete userFoundObj.createdAt; // elimina la propiedad createdAt del objeto para no enviarla en la respuesta
    delete userFoundObj.updatedAt; // elimina la propiedad updatedAt del objeto para no enviarla en la respuesta
    console.log(`soy middleware de autenticación, aquí se debería verificar el token`,payload, userFoundObj);
    req.payload = userFoundObj; // agrega el objeto del usuario al request para que esté disponible en los controladores
    req.user = userFoundObj; // agrega el objeto del usuario al request para que esté disponible en los controladores
    
    next();
};


export { authenticationUser };