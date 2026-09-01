import { UserModel } from "../models/User.model.js"; // importo el modelo de la base de datos

const dbCreateUser = async (newUser) => {
    return await UserModel.create(newUser); // creo usuario
}

const dbGetUserByEmail = async (email) => {
    return await UserModel.findOne({ email: email.toLowerCase() }).populate('barId'); // busca usuario por email y popula barId
}

const dbGetUsers = async () => {
    return await UserModel.find(); // busco usuarios
}
const dbDeleteUser = async (id) => {
    return await UserModel.findOneAndDelete({ _id: id }); // busco el id en la base de datos y lo borro
}
const dbGetUserById = async (id) => {
    return await UserModel.findOne({ _id: id }).populate('barId'); // busca el id y popula datos del bar
}
const dbUpdateUser = async (id, inputData) => {
    return await UserModel.findOneAndUpdate(
        { _id: id },  // busca el id en la base de datos
        inputData, // actualiza con el objeto recibido por body
        { new: true } // devuelve el objeto actualizado
    ).populate('barId');
}

export { dbCreateUser, dbGetUsers, dbDeleteUser, dbGetUserById, dbUpdateUser, dbGetUserByEmail };