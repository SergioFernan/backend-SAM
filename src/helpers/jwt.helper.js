import jwt from 'jsonwebtoken';

const generateToken = (payload) => {
    // 1. Guardamos el resultado de jwt.sign en la variable 'Token'
    const Token = jwt.sign(
        payload, // Carga Útil
        'murcielago', // Semilla (Mejor usar comillas simples)
        { expiresIn: '1h' } // Configuraciones (Comillas simples)
    ); 

    // Ahora el return sí cambiará a color rosado porque la variable existe y es accesible
    return Token;
}

const verifyToken = (token) => {
    try {
        // jwt.verify valida la firma y expiracion, devuelve el payload si es valido
        return jwt.verify(token, 'murcielago');
    } catch (error) {
        // si el token es invalido o expiro, retornamos null
        return null;
    }
}

export { generateToken, verifyToken };