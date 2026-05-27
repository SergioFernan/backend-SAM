import CategoryModel from "../models/categories.model.js";
import { dbCreateCategory, dbDeleteCategory, dbGetCategory, dbUpDateCategory } from "../services/category.service.js";



const getCategory = async (req, res) => {

    try {

        const data = await dbGetCategory()

        res.status(201).json({
            msj: 'Home, Festivals, Concerts, Clubs',
            data: data
        })

    } catch (error) {
        console.error(error);

        res.status(500).json({
            msg: 'No se pudieron obtener las categorias'
        });
    };
};





const postCategory = async (req, res) => {   //La función tiene que ser async 

    try {

        //Obtengo los datos enviados en la petición:
        const inputData = req.body;

        //Registra usando el Modelo y guarda la respuesta en la cosntatnte data:
        const data = await dbCreateCategory(inputData);

        //Respondemos al cliente enviando los datos registrados
        res.status(201).json({
            data: data
        });

    } catch (error) {

        console.error(error);  //Mensaje en la consola para el desarrollador 

        // Respondemos al ususario enciando un mensaje humano 
        res.status(500).json({
            msg: 'No se pudo registrar la categoría'
        });
    };
};




const patchCategory = async (req, res) => {

    try {

        const id = req.params.id;
        const inputData = req.body;

       const data = await dbUpDateCategory(id, inputData)


        res.status(200).json({
            msj: 'Update category',
            data: data
        });


    } catch (error) {
        console.error(error);

        res.status(500).json({
            msg: 'No se pudo actualizar la información'
        })



    }
};





const deleteCategory = async (req, res) => {

    try {

        const id = req.params.id;

        const data = await dbDeleteCategory(id);

        res.status(200).json({
            msj: 'Delete category',
            // data: data,
            id: id
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            msg: 'No se pudo borrar la categoria'
        });
    };
};






export { getCategory, postCategory, patchCategory, deleteCategory };   