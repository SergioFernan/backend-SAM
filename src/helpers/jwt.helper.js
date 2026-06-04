import jsonwebtoken from 'jsonwebtoken'; // https://www.npmjs.com/package/jsonwebtoken

const generateToken = ( payLoad ) => {
    const token = jsonwebtoken.sign(payLoad, `miClaveSecreta`, { expiresIn: '1h' }); // loguea y genera un token con el payload, la clave secreta y el tiempo de expiración, devuelve el token
    return token;
}

export { generateToken };
