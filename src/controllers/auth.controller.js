const loginUser = ( req, res ) => {

// paso 1: extraer los datos del cuerpo de la peticion (email, password)
    const  inputData = req.body; // recibe el body email, password

    // paso 2: validar que el email y password existen en la base de datos
    // si el email no existe, devolver un error 404
    // si el password no coincide con el email, devolver un error 401
    const userFound = await dbGetUserByEmail ( inputData.email ); // busca el email en la base de datos
if ( ! userFound ) {
    return res.body.status(400).json({
        msg: `email no encontrado. registrese para iniciar sesión`
    });
}

    // paso 3: si el email y password son correctos, generar un token de autenticación (JWT) y devolverlo en la respuesta


    
}

export { loginUser}; 