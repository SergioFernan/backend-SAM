import mongoose from "mongoose";
import CategoryModel from "../models/categories.model.js";
import { dbCreateCategory, dbDeleteCategory, dbGetCategory, dbUpDateCategory, dbGetCategoryById } from "../services/category.service.js";


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




const getCategoryById = async (req, res) => {

    try {

        const id = req.params.id;

        // La validación defensiva va dentro del TRY ( condicionamos previo a que ocurrea el error ) 

        if (!mongoose.Types.objectiD.isValid(id)) {      // --> En este campo se importa mongoose
            
            return res.status(400).json({
                msg: 'Error Id: No se encontró la categoría.'
                });
            };

            const data = await dbGetCategoryById(id);

            res.status(200).json({
                msg: 'obtine un producto por ID',
                data: data
            });

        } catch (error) {

            console.error(error);

            /// Si la exepción va dentro del CATCH es ( esta opción genera más control sobre el error )

            res.status(500).json({
                msg: 'ERROR: No se encontró el Id del producto'
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

            // Validación Excespción: Manjear cuanndo ocurre el error

            if (error.name === 'CastError') {

                return res.status(400).json({
                    msg: 'Error Id: No se epudo actualizar'
                });
            };

            res.status(500).json({
                msg: 'No se pudo actualizar la información'
            })



        }
    };




    const deleteCategory = async (req, res) => {

        try {

            const id = req.params.id;

            if (!mongoose.Types.ObjectId.isValid(id)) {

                return res.status(400).json({
                    msg: 'Error Id: No se pudo eliminar la categoria'
                })

            }

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




    export { getCategory, postCategory, patchCategory, deleteCategory, getCategoryById };   