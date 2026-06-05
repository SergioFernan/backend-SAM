const authenticationUser = (req, res, next) => {
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
    console.log(`soy middleware de autenticación, aquí se debería verificar el token`, token);
    next();
}

export { authenticationUser };