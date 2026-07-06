import { GatewayModel } from "../models/gateway.model.js";

// crear una nueva pasarela en la base de datos
const dbCreateGateway = async (newGateway) => {
    return await GatewayModel.create(newGateway);
};

// obtener todas las pasarelas registradas
const dbGetGateways = async () => {
    return await GatewayModel.find()
        .populate("user", "name email")    // trae solo el nombre y correo del usuario
        .populate("ticket", "name price"); // trae solo el nombre y precio del ticket
};

// buscar una pasarela por su id
const dbGetGatewayById = async (id) => {
    return await GatewayModel.findById(id)
        .populate("user", "name email")
        .populate("ticket", "name price");
};

// actualizar una pasarela por su id
// { new: true } para que devuelva el documento ya actualizado y no el original
const dbUpdateGateway = async (id, inputData) => {
    return await GatewayModel.findByIdAndUpdate(id, inputData, { new: true });
};

// eliminar una pasarela por su id
const dbDeleteGateway = async (id) => {
    return await GatewayModel.findByIdAndDelete(id);
};

export {
    dbCreateGateway,
    dbGetGateways,
    dbGetGatewayById,
    dbUpdateGateway,
    dbDeleteGateway,
};
