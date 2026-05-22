import CategoryModel from "../models/categories.model.js";
import { insertcategory } from "../services/category.service.js";

const getCategory = ( req, res ) => {

    res.json({
        msj:'Home, Festivals, Concerts, Clubs'
    })
}


const postCategory = async ( req, res ) => {   //La función tiene que ser async 

    try {
        
    //Obtengo los datos enviados en la petición:
    const inputData = req.body;

    //Registra usando el Modelo y guarda la respuesta en la cosntatnte data:

    const data = await insertcategory ( inputData );
   
    //Respondemos al cliente enviando los datos registrados
    res.json({
        data: data
    })

    } catch (error) {

            console.error( error);  //Mensaje en la consola para el desarrollador 

            // Respondemos al ususario enciando un mensaje humano 
        res.status(500).json({
            msg: 'No se pudo registrar la categoría'   
        })
    }
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