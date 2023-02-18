import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();
const logger = morgan("common");

const PORT = 4000;

console.log(process.cwd())


app.set("view engine","pug");
app.set("views",process.cwd()+"/src/views");

app.use(logger);

app.use("/",globalRouter);
app.use("/videos",videoRouter);
app.use("/users",userRouter);




 
const handleListening = () => {
    console.log(`Server Listening on port 4000 localhost${PORT}`);
}

app.listen(PORT,handleListening);


