import databaseconnection from "./db/database.js";
import app from "../app.js";





databaseconnection()
.then(() => {
    app.listen(8000, () => {
        console.log(`Server is running on http://localhost:8000 `);
    });
})
.catch((error) => {
    console.log("error in db connection" , error);
    process.exit(1);
});
