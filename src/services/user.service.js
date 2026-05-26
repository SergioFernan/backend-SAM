import { UserModel } from "../models/User.model.js"; // importo el modelo de la base de datos

const insertUser = async (newUser) => {
    return await UserModel.create(newUser); // creo usuario
}

export { insertUser };