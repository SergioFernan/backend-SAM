import jsonwebtoken from 'jsonwebtoken'; // https://www.npmjs.com/package/jsonwebtoken

const generateToken = ( payLoad ) => {
    const token = jsonwebtoken.sign(payLoad, `miClaveSecreta`, { expiresIn: '1h' }); // loguea y genera un token con el payload, la clave secreta y el tiempo de expiración, devuelve el token
    return token;
}
const verifyToken = (token) => {
    try {
        const payload = jsonwebtoken.verify(token, `miClaveSecreta`); // verifica el token con la clave secreta, devuelve el payload si el token es válido o lanza un error si no lo es
        return payload;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export { generateToken, verifyToken };
