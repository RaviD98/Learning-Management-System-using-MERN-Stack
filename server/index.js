import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";

dotenv.config({});
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

//Default middleware
app.use(express.json());
app.use(cookieParser()); //npm i cookie-parser
app.use(cors({
   origin: "http://localhost:5173",
   credentials: true,
}));


//APIs
app.use("/api/v1/users", userRoute);
app.use("/api/v1/course", courseRoute);


app.listen(PORT, () =>{
   console.log(`Listening on ${PORT}`); 
});