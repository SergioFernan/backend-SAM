import { UserModel } from "../models/User.model.js"; // importo el modelo de la base de datos

const dbCreateUser = async (newUser) => { // recibe un objeto con los datos del nuevo usuario
    return await UserModel.create(newUser); // creo usuario
}

const dbGetUsers = async () => { // busco usuarios
    return await UserModel.find(); // busco usuarios
}
const dbDeleteUser = async (id) => { // busca el id en la base de datos y lo borro
    return await UserModel.findOneAndDelete({ _id: id }); // busco el id en la base de datos y lo borro
}
const dbGetUserById = async (id) => { // busca el id en la base de datos y devuelve el objeto
    return await UserModel.findOne({ _id: id }); // busca el id en la base de datos y devuelve el objeto
}
const dbUpdateUser = async (id, inputData) => { // busca el id en la base de datos y actualiza con el objeto recibido por body
    const data = await UserModel.findOneAndUpdate(
        { _id: id },  // busca el id en la base de datos
        inputData, // actualiza con el objeto recibido por body
        { new: true } // devuelve el objeto actualizado
    ) 
}
const dbGetUserByEmail = async (email) => { // busca el email en la base de datos y devuelve el objeto
    return await UserModel.findOne({ email: email.toLowerCase() }); // busca el email en la base de datos y devuelve el objeto
}

export { dbCreateUser, dbGetUsers, dbDeleteUser, dbGetUserById, dbUpdateUser, dbGetUserByEmail };