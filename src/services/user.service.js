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
const dbGetUserById = async (id) => {
    return await UserModel.findOne({ _id: id }); // busca el id en la base de datos y devuelve el objeto
}
const dbUpdateUser = async (id, inputData) => {
    const data = await UserModel.findOneAndUpdate(
        { _id: id },  // busca el id en la base de datos
        inputData, // actualiza con el objeto recibido por body
        { new: true } // devuelve el objeto actualizado
    ) 
}

export { dbCreateUser, dbGetUsers, dbDeleteUser, dbGetUserById, dbUpdateUser };