import app from "./app.js";
import dotenv from "dotenv";
dotenv.config("/.env");

const testDb = async () => {
    console.log("Database is connected.");
};
testDb();
app.listen(process.env.PORT, () => {
  console.log(`The server is on, listening on port ${process.env.PORT}!`);
});
