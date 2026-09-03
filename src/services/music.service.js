import { MusicModel } from "../models/music.model.js";

const dbCreateMusic = async (inputData) => {
    const data = new MusicModel(inputData);
    await data.save();
    return data;
}

// Solo devuelve las músicas activas por defecto
const dbGetAllMusic = async () => {
    return MusicModel.find({ isActive: true });
}

const dbGetMusicById = async (id) => {
    return MusicModel.findById(id);
}

const dbUpdateMusic = async (id, inputData) => {
    return MusicModel.findByIdAndUpdate(id, inputData, { new: true });
}

const dbDeleteMusic = async (id) => {
    return MusicModel.findByIdAndDelete(id);
}

export { dbCreateMusic, dbGetAllMusic, dbGetMusicById, dbUpdateMusic, dbDeleteMusic };

