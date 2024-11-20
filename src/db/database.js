import mongoose from "mongoose";


let databaseconnection = async () => {
    try {
        await mongoose.connect(`mongodb+srv://Shotlin0912:Shotlin0912@shotlin.jpiyx.mongodb.net/?retryWrites=true&w=majority&appName=pikatube`)
        .then(() => { console.log("Database connected") })
        .catch((err) => 
        { console.log(err) });
    } catch (err) {
        console.log(err);
    }
};


export default databaseconnection;
