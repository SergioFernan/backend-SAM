import { dbGetFaqs, dbGetFaqById, dbCreateFaq, dbDeleteFaq, dbUpdateFaq } from "../services/faq.services.js";

const getFaqs = async (req, res) => {
    try {
        const data = await dbGetFaqs();
        res.status(200).json({
            msj: `obtener preguntas frecuentes`,
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msj: `error al obtener preguntas frecuentes`
        });
    }
}

const getFaq = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await dbGetFaqById(id);
        if (!data) {
            return res.status(404).json({ msj: "pregunta no encontrada" });
        }
        res.status(200).json({
            msj: `obtener pregunta`,
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msj: `error al obtener pregunta`
        });
    }
}

const postFaqs = async (req, res) => {
    try {
        const inputData = req.body;
        const data = await dbCreateFaq(inputData);
        res.status(201).json({
            msj: `pregunta creada`,
            data: data
        });
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                msj: `error de validación`,
                errors: Object.values(error.errors).map(e => e.message)
            });
        }
        if (error.name === 'CastError') {
            return res.status(400).json({
                msj: `valor inválido para el campo '${error.path}'`
            });
        }
        res.status(500).json({
            msj: `error al crear pregunta`
        })
    }
}

const putFaqs = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = req.body;
        const data = await dbUpdateFaq(id, inputData);
        if (!data) {
            return res.status(404).json({ msj: "pregunta no encontrada" });
        }
        res.json({
            msj: `actualizar pregunta`,
            data: data
        })
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                msj: `error de validación`,
                errors: Object.values(error.errors).map(e => e.message)
            });
        }
        if (error.name === 'CastError') {
            return res.status(400).json({
                msj: `valor inválido para el campo '${error.path}'`
            });
        }
        res.status(500).json({
            msj: `error al actualizar pregunta`
        })
    }
}

const deleteFaqs = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await dbDeleteFaq(id);
        if (!data) {
            return res.status(404).json({ msj: "pregunta no encontrada" });
        }
        res.json({
            msj: `borrar pregunta`,
            data: data
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msj: `error al borrar pregunta`
        })
    }
}

export { getFaqs, getFaq, postFaqs, putFaqs, deleteFaqs };
