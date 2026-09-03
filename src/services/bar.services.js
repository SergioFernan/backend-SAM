import { BarModel } from "../models/bar.model.js"

const dbCreateBar = async ( newBar ) => {
    return await BarModel.create( newBar )
}

const dbGetBar = async () => {
    return await BarModel.find().populate('userId', 'name email role')
}

const dbGetBarById = async( id ) => {
    return await BarModel.findById( id ).populate('userId', 'name email role')
}

const dbGetBarByUserId = async( userId ) => {
    return await BarModel.findOne({ userId }).populate('userId', 'name email role')
}

const dbDeleteBar = async( id ) => {
    return await BarModel.findOneAndDelete({_id: id })
}

const dbUpdateBar = async( id, inputData ) => {
    return await BarModel.findOneAndUpdate({ _id: id }, inputData, {returnDocument: 'after'}).populate('userId', 'name email role')
}

export { dbCreateBar, dbGetBar, dbGetBarById, dbGetBarByUserId, dbDeleteBar, dbUpdateBar }