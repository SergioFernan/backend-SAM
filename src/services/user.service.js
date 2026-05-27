import { UserModel } from "../models/User.model.js"; // importo el modelo de la base de datos

const dbCreateUser = async (newUser) => {
    return await UserModel.create(newUser); // creo usuario
}

const dbGetUsers = async () => {
    return await UserModel.find(); // busco usuarios
}

export { dbCreateUser, dbGetUsers };