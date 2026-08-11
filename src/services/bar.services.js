import { BarModel } from "../models/bar.model"

const dbCreateBar = async ( newBar ) => {
    return await BarModel.create( newBar )
}

const dbGetBar = async () => {
    return await BarModel.find()
}

const dbGetBarById = async( id ) => {
    return await BarModel.finsById( id )
}

const dbDeleteBar = async( id ) => {
    return await BarModel.findOneAndDelete({_id: id })
}

const dbUpdateBar = async( id, inputData ) => {
    return await BarModel.findOneAndUpdate({ _id: id }, inputData, {returnDocument: 'after'})
}

export { dbCreateBar, dbGetBar, dbGetBarById, dbDeleteBar, dbUpdateBar }