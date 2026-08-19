import jwt from 'jsonwebtoken';

const generateToken = (payload) => {
    // 1. Guardamos el resultado de jwt.sign en la variable 'Token'
    const Token = jwt.sign(
        payload, // Carga Útil
        process.env.JWT_SECRET || 'supersecret123', // Semilla con fallback
        { expiresIn: '1h' } // Configuraciones
    ); 

    return Token; 
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET || 'supersecret123');
    } catch (error) {
        return null;
    }
}

export { generateToken, verifyToken };