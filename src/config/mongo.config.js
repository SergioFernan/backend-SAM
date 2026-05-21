import mongoose from "mongoose";


async function dbConection() {
    try {
        await mongoose.connect('mongodb+srv://mrippo:Santafesito-2@cluster0.s8nhaxy.mongodb.net/db-SAM');
        console.log(`conected mongodb`);
    } catch (error) {
        console.error(`conected failed`);
    }
}
//el try-catch se usa para manejar errores en tiempo de ejecucion 

export { dbConection };

