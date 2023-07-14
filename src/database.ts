import mongoose from "mongoose";
import "dotenv/config";

const MONGO_URI= process.env.MONGO_URI || '';

mongoose.connect(MONGO_URI).then(() => {
    console.log('Database is connected')
}).catch((err) => {
    console.log('Error: ', err)
})
