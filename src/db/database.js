import mongoose from "mongoose";


let databaseconnection = async () => {
    try {
        await mongoose.connect(`mongodb+srv://Sayanm0981:Sayanm0912@pikatube.ugxdp.mongodb.net/?retryWrites=true&w=majority&appName=pikatube`)
        .then(() => { console.log("Database connected") })
        .catch((err) => 
        { console.log(err) });
    } catch (err) {
        console.log(err);
    }
};


export default databaseconnection;