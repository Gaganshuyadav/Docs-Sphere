import dotenv,{ config} from "dotenv";
import cors from "cors";
dotenv.config({ path: '.env.development'});
import express, { Request, Response} from "express";
import router from "./routes/index.js";
const app = express();
// npm install pg pg-hstore && npm run build


app.use(cors());

//res.json conversion
app.use(express.json());



//db connection--------------------------------------------

import db from "./models/index.js";
import { env } from "./config/env.config.js";

db.sequelize.sync({ alter: true})
.then((data)=>{
    console.log("All Tables are created successfully");
})
.catch((err)=>{
    console.log("error in creation of tables");
})



db.sequelize.authenticate()
.then((data)=>{
    console.log("database is connected");
})
.catch((err)=>{
    console.log(err);
    console.log("error in database connection");
})


//server routes--------------------------------------------


app.get("/", ( req:Request, res:Response)=>{
    res.json({
        success:true,
        message:"docs sphere server is now connected"
    })
})

app.use(router);




export { app};