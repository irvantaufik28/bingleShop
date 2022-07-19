import express from "express";
import cors from "cors";

const app = express();

// midlewire
app.use(cors());

import UserRoute from "./routes/UserRoute.js"

// app.use(express.json()) agar bisa merequest file json
app.use(express.json());
app.use(UserRoute);

app.get('/',(req,res)=>{
    res.json({
        message: "TEST SERVER OK!!!!"
    });
});

const PORT = process.env.PORT || 3100;
app.listen (PORT, ()=> console.log (` server running on port ${PORT}`))