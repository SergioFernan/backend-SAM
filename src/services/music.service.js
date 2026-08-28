import { MusicModel } from "../models/music.model.js"

const dbCreateMusic = async ( newBar ) => {
    return await MusicModel.create( newBar )
}

const dbGetMusic = async () => {
    return await MusicModel.find()
}

const dbGetMusicById = async( id ) => {
    return await MusicModel.findById( id )
}

const dbDeleteMusic = async( id ) => {
    return await MusicModel.findOneAndDelete({_id: id })
}

const dbUpdateMusic = async( id, inputData ) => {
    return await MusicModel.findOneAndUpdate({ _id: id }, inputData, {returnDocument: 'after'})
}

export { dbCreateMusic, dbGetMusic, dbGetMusicById, dbDeleteMusic, dbUpdateMusic }