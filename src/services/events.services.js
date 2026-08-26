import EventModel from "../models/Events.models.js";

const dbCreateEvent = async (newEvent) => {
    return await EventModel.create(newEvent);
}

// const dbGetEvents = async () => {
//     return await EventModel.find();
// }

const dbGetEvents = async ({ page = 1, limit = 10, isFeatured = false } = {}) => {
    // 1. Filtro de eventos activos (status: true)
    const filter = { status: true };
    
    // 2. Si se solicita destacado, agregamos la condición 'isFeatured'
    if (isFeatured) {
        filter.isFeatured = true;
    }

    // 3. Cálculo del salto de registros para la paginación
    const skip = (page - 1) * limit;

    // 4. Consulta a la base de datos ordenada por la fecha del evento ('initialDate')
    const [events, totalEvents] = await Promise.all([
        EventModel.find(filter)
            .sort({ initialDate: -1 }) // Ordenado por la fecha propia del evento
            .skip(skip)
            .limit(limit),
        EventModel.countDocuments(filter)
    ]);

    // 5. Estructura de respuesta paginada
    return {
        data: events,
        pagination: {
            totalEvents,
            currentPage: page,
            pageSize: limit,
            totalPages: Math.ceil(totalEvents / limit),
            hasNextPage: page * limit < totalEvents,
            hasPrevPage: page > 1
        }
    };
};

export default dbGetEvents;

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