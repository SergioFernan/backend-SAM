import bcrypt, { compareSync } from 'bcrypt'; // bcrypt es una libreria de encriptacion de contraseñas, es una de las mas seguras y faciles de usar, se instala con npm install bcrypt

const encryptPassword = (password) => {
    // paso 1 generar cadena aleatoria para encriptar la contraseña salt
    const salt = bcrypt.genSaltSync(9); // el numero 10 es la cantidad de vueltas que se le da a la encriptacion, entre mas vueltas mas seguro pero tambien mas lento

    // paso 2 encriptar la contraseña con el salt generado
    const hashedPassword = bcrypt.hashSync(password, salt); // hashSync es una funcion de bcrypt que recibe la contraseña y el salt para generar la contraseña encriptada

    return hashedPassword; // devuelve la contraseña encriptada
}

const validatePassword = (originalPassword, hashedPassword) => { // esta funcion recibe la contraseña sin encriptar y la contraseña encriptada para compararlas
    const isValid = compareSync(originalPassword, hashedPassword); // compareSync es una funcion de bcrypt que recibe la contraseña sin encriptar y la contraseña encriptada para compararlas, devuelve true si son iguales y false si no lo son
    return isValid;
}

export { encryptPassword, validatePassword };