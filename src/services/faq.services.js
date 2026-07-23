import FaqModel from "../models/faq.model.js";

const dbCreateFaq = async (newFaq) => {
    return await FaqModel.create(newFaq);
}

const dbGetFaqs = async () => {
    return await FaqModel.find({});
}

const dbGetFaqById = async (id) => {
    return await FaqModel.findById(id);
}

const dbDeleteFaq = async (id) => {
    return await FaqModel.findOneAndDelete({ _id: id });
}

const dbUpdateFaq = async (id, inputData) => {
    return await FaqModel.findOneAndUpdate(
        { _id: id },
        inputData,
        { returnDocument: 'after' }
    );
}

export { dbCreateFaq, dbGetFaqs, dbGetFaqById, dbDeleteFaq, dbUpdateFaq };
