import ContactModel from "../models/contact.model.js";

const dbCreateContact = async (newContact) => {
    return await ContactModel.create(newContact);
}

const dbGetContacts = async () => {
    return await ContactModel.find({});
}

const dbGetContactById = async (id) => {
    return await ContactModel.findById(id);
}

const dbDeleteContact = async (id) => {
    return await ContactModel.findOneAndDelete({ _id: id });
}

const dbUpdateContact = async (id, inputData) => {
    return await ContactModel.findOneAndUpdate(
        { _id: id },
        inputData,
        { returnDocument: 'after' }
    );
}

export { dbCreateContact, dbGetContacts, dbGetContactById, dbDeleteContact, dbUpdateContact };
