import { MusicModel } from "../models/music.model.js";

const dbCreateMusic = async (inputData) => {
    const data = new MusicModel(inputData);
    await data.save();
    return data;
}

const dbGetAllMusic = async () => {
    return MusicModel.find();
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