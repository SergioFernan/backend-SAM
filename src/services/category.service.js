//Services: Su responsabilidad es hablarse con la base de datos

import CategoryModel from "../models/categories.model.js";

const insertcategory = async ( newCategory ) => {

    return await CategoryModel.create( newCategory );
}

export { 
    insertcategory
}