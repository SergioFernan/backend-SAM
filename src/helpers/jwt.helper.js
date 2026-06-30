import jsonwebtoken from 'jsonwebtoken'; // https://www.npmjs.com/package/jsonwebtoken

const generateToken = ( payLoad ) => {
    const token = jsonwebtoken.sign(payLoad, process.env.JWT_SECRET || 'miClaveSecreta', { expiresIn: '1h' }); // loguea y genera un token con el payload, la clave secreta/env and expiration time, returns the token
    return token;
}
const verifyToken = (token) => {
    try {
        const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET || 'miClaveSecreta'); // verifies token with env secret key / default secret, returns payload if valid
        return payload;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export { generateToken, verifyToken };
