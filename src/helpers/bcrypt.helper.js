import {genSaltSync, hashSync} from "bcrypt";

const encryptPassword = (originalPassword) => {
  // Paso 1: Generar una cadena de caracteres aleatoria (salt) para agregar seguridad a la contraseña
  const salt = genSaltSync(4);
  
  // Paso 2: Combinar la contraseña original con el salt y aplicar un algoritmo de hash para obtener la contraseña cifrada
  const hashPassword = hashSync(
      originalPassword, // password original que se desea cifrar
      salt);  // salt generado en el paso anterior
  
  // Paso 3: Retornar la contraseña cifrada
  return hashPassword;
};

export default encryptPassword;