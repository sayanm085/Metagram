import mongoose from "mongoose";


let databaseconnection = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/MetaGram`)
        .then(() => { console.log("Database connected") })
        .catch((err) => 
        { console.log(err) });
    } catch (err) {
        console.log(err);
    }
};


export default databaseconnection;