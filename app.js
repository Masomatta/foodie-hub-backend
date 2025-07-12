import express from "express"
import router from "./routes/index.js"
import bodyParser from "body-parser"

const app = express()
app.use(bodyParser.json());
app.use(express.json());
app.use('/api', router);    
export default app;
