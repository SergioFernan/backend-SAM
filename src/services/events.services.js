import EventModel from "../models/Events.models.js";

const dbCreateEvent = async (newEvent) => {
    return await EventModel.create(newEvent);
}

const dbGetEvents = async () => {
    return await EventModel.find();
}

const dbGetEventById = async (id) => {
    return await EventModel.findById(id);
}

const dbDeleteEvent = async (id) => {
    return await EventModel.findOneAndDelete({ _id: id });
}

const dbUpdateEvent = async (id, inputData) => {
    return await EventModel.findOneAndUpdate(
        { _id: id },
        inputData,
        { returnDocument: 'after' }
    );
}

export { dbCreateEvent, dbGetEvents, dbGetEventById, dbDeleteEvent, dbUpdateEvent };