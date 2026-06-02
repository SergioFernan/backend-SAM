import LocationModel from "../models/location.model.js";

const dbCreateLocation = async (newLocation) => {
    return await LocationModel.create(newLocation);
}

const dbGetLocations = async () => {
    return await LocationModel.find({}).populate(['ownerUserId', 'registerUserId'], "name email role");
}

const dbGetLocationById = async (id) => {
    return await LocationModel.findById(id).populate(['ownerUserId', 'registerUserId'], "name email role");
}

const dbDeleteLocation = async (id) => {
    return await LocationModel.findOneAndDelete({ _id: id });
}

const dbUpdateLocation = async (id, inputData) => {
    return await LocationModel.findOneAndUpdate(
        { _id: id },
        inputData,
        { returnDocument: 'after' }
    );
}

export { dbCreateLocation, dbGetLocations, dbGetLocationById, dbDeleteLocation, dbUpdateLocation };
