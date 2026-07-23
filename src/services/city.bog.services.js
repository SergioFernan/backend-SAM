import BogModel from "../models/city.bog.model";

const dbGetCity = async () => {
    return await BogModel.find()
}

const dbCreateCity = async ( newCity ) => {
    return await BogModel.create( newCity )
}

const dbGetCityById = async ( id ) => {
    return await BogModel.findOne({ _id: id })
}

const dbDeleteCity = async ( id ) => {
    return await BogModel.findByIdAndDelete( id )
}

const dbUpDateCity = async ( id, inputData ) => {
    return await BogModel.findByIdAndUpDate( id, inputData, { new: true })
}

export {
    dbGetCity,
    dbCreateCity,
    dbGetCityById,
    dbUpDateCity,
    dbDeleteCity
}