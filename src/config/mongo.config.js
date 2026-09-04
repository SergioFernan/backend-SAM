import mongoose from "mongoose";

const LOCAL_STRING_CONNECTION = 'mongodb://localhost:27017/db-store';
const REMOTE_STRING_CONNECTION = process.env.MONGO_URI || LOCAL_STRING_CONNECTION;


async function dbConection() {
    try {

        await mongoose.connect( 'mongodb+srv://mrippo:Santafesito-2@cluster0.s8nhaxy.mongodb.net/db-SAM' );

        console.log(`conected mongodb`);
    } catch (error) {
        console.error(`conected failed`);
    }   
}
//el try-catch se usa para manejar errores en tiempo de ejecucion 

export { dbConection };

