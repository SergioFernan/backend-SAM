import mongoose from 'mongoose';
import { dbConection } from './config/mongo.config.js';
import { SupportModel } from './models/support.model.js';

const checkDb = async () => {
    await dbConection();
    const docs = await SupportModel.find();
    console.log('Docs in support_tickets:', docs);
    process.exit(0);
};

checkDb();
