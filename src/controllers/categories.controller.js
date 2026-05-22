import CagoryModel from "../models/categories.model.js";

const getCategory = ( req, res ) => {

    res.json({
        msj:'Home, Festivals, Concerts, Clubs'
    })
}


const postCategory = async ( req, res ) => {   //La función tiene que ser async 

    //Obtengo los datos enviados en la petición:
    const inputData = req.body;

    //Registra usando el Modelo y guarda la respuesta en:
    const data = await CagoryModel.create( inputData );  //Compara los datos que entran con los que tiene reservados en categories.model
   
    //Respondemos al cliente enviando los datos registrados
    res.json({
        // msj:'Create category',
        //inputData: inputData,
        data: data
    })
};


const putcategory = ( req, res ) => {

    res.json({
        msj:'Update category'
    })
};

const deleteCategory = ( req, res ) => {

    res,json({
        msj:'Delete category'
    })
};

export { getCategory, postCategory, putcategory, deleteCategory}   