//Services: Su responsabilidad es hablarse con la base de datos

import CategoryModel from "../models/categories.model.js";

const dbCreateCategory = async ( newCategory ) => {

    return await CategoryModel.create( newCategory );
};

const dbGetCategory = async () => {

    return await CategoryModel.find();
}; 

const dbDeleteCategory = async ( id ) => {

    return await CategoryModel.findByIdAndDelete( id );
};

const dbUpDateCategory = async ( id, inputData ) => {
    console.log({ id, inputData})
    return await CategoryModel.findByIdAndUpdate( id, inputData, {new: true})
}


export { 
    dbCreateCategory,
    dbGetCategory,
    dbDeleteCategory, 
    dbUpDateCategory
};