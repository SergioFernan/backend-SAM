import EventModel from "../models/Events.models.js";
import { BarModel } from "../models/bar.model.js";

const calculateTotalStock = (localidades = {}) => {
    const general = Number(localidades?.general?.stock) || 0;
    const vip = Number(localidades?.vip?.stock) || 0;
    const backstage = Number(localidades?.backstage?.stock) || 0;
    const palco = Number(localidades?.palco?.stock) || 0;
    return general + vip + backstage + palco;
};

const validateEventCapacity = async (barId, localidades) => {
    if (!barId) return;

    const bar = await BarModel.findById(barId);
    if (!bar) {
        const error = new Error("El bar o local especificado no existe");
        error.name = "CapacityValidationError";
        throw error;
    }

    const totalStock = calculateTotalStock(localidades);
    if (totalStock > bar.capacity) {
        const error = new Error(`La suma total de localidades (${totalStock}) supera la capacidad máxima del bar (${bar.capacity})`);
        error.name = "CapacityValidationError";
        error.details = { totalStock, capacity: bar.capacity };
        throw error;
    }
};

/**
 * Valida la coherencia de fechas e inicio/fin de un evento en el servidor.
 * Reglas:
 * 1. finalDate no puede ser anterior o igual a initialDate.
 * 2. La duración mínima del evento debe ser de al menos 40 minutos.
 */
const validateEventDates = (initialDate, finalDate) => {
    if (!initialDate || !finalDate) return;

    const startDate = new Date(initialDate);
    const endDate = new Date(finalDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        const error = new Error("Las fechas especificadas no tienen un formato válido");
        error.name = "DateRangeValidationError";
        throw error;
    }

    if (endDate <= startDate) {
        const error = new Error("La fecha y hora de finalización no puede ser anterior o igual a la fecha de inicio");
        error.name = "DateRangeValidationError";
        throw error;
    }

    const diffInMs = endDate.getTime() - startDate.getTime();
    const diffInMinutes = diffInMs / (1000 * 60);
    const MIN_DURATION_MINUTES = 40;

    if (diffInMinutes < MIN_DURATION_MINUTES) {
        const error = new Error(`La duración mínima del evento debe ser de al menos 40 minutos (duración actual: ${Math.round(diffInMinutes)} min)`);
        error.name = "DateRangeValidationError";
        error.details = { currentMinutes: Math.round(diffInMinutes), minRequiredMinutes: MIN_DURATION_MINUTES };
        throw error;
    }
};

const dbCreateEvent = async (newEvent) => {
    validateEventDates(newEvent.initialDate, newEvent.finalDate);
    await validateEventCapacity(newEvent.bar, newEvent.localidades);
    return await EventModel.create(newEvent);
}

const dbGetEvents = async () => {
    return await EventModel.find().populate('bar');
}

const dbGetEventById = async (id) => {
    return await EventModel.findById(id).populate('bar');
}

const dbDeleteEvent = async (id) => {
    return await EventModel.findOneAndDelete({ _id: id });
}

const dbUpdateEvent = async (id, inputData) => {
    const existingEvent = await EventModel.findById(id);
    if (!existingEvent) {
        return null;
    }

    const initialDate = inputData.initialDate || existingEvent.initialDate;
    const finalDate = inputData.finalDate || existingEvent.finalDate;
    validateEventDates(initialDate, finalDate);

    const barId = inputData.bar || existingEvent.bar;
    const existingLocalidades = existingEvent.localidades ? existingEvent.localidades.toObject() : {};
    const mergedLocalidades = {
        general: { ...existingLocalidades.general, ...inputData.localidades?.general },
        vip: { ...existingLocalidades.vip, ...inputData.localidades?.vip },
        backstage: { ...existingLocalidades.backstage, ...inputData.localidades?.backstage },
        palco: { ...existingLocalidades.palco, ...inputData.localidades?.palco }
    };

    await validateEventCapacity(barId, mergedLocalidades);

    return await EventModel.findOneAndUpdate(
        { _id: id },
        inputData,
        { returnDocument: 'after' }
    );
}

export { dbCreateEvent, dbGetEvents, dbGetEventById, dbDeleteEvent, dbUpdateEvent };