import mongoose from 'mongoose';
import { SupportModel } from './models/support.model.js';

const checkDb = async () => {
    await mongoose.connect('mongodb+srv://mrippo:Santafesito-2@cluster0.s8nhaxy.mongodb.net/db-SAM');
    const docs = await SupportModel.find();
    console.log('Docs in db-SAM support_tickets:', docs);
    process.exit(0);
};

checkDb();
