import { UserModel } from "../models/User.model.js"; // importo el modelo de la base de datos

const dbCreateUser = async (newUser) => {
    return await UserModel.create(newUser); // creo usuario
}

const dbGetUsers = async () => {
    return await UserModel.find(); // busco usuarios
}
const dbDeleteUser = async (id) => {
    return await UserModel.findOneAndDelete({ _id: id }); // busco el id en la base de datos y lo borro
}

export { dbCreateUser, dbGetUsers, dbDeleteUser };