import express from "express";
import morgan from "morgan";
import session from "express-session";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();
const logger = morgan("common");



console.log(process.cwd())


app.set("view engine","pug");
app.set("views",process.cwd()+"/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true }));

/*
브라우저에서 서버로 request를 보낼때마다 서버는 브라우저들을 기억하기 위해 sessionId 라는 unique한 값을 생성해 브라우저로 다시 보낸다. 
서버에서는 sessionId를 sessionDB에 저장하고 브라우저에서는 쿠키에 저장해 두었다가 브라우저가 다시 request를 할시 cookie에 저장되어있는 sessionId와 서버 sessionDB에 저장되어있는 sessionId
를 확인해 현재 접속한 브라우저를 구분한다. 
*/

app.use(
    session({
        secret : "Hello",
        resave : true,
        saveUninitialized : true
    })
);

app.use((req,res,next)=>{
   req.sessionStore.all((error,sessions)=>{
    console.log(sessions);
    next();
   }); 
});

app.get("/add-one", (req, res, next) => {
    req.session.potato += 1;
    return res.send(`${req.session.id} ${req.session.potato}`);
  });
  

app.use("/",globalRouter);
app.use("/videos",videoRouter);
app.use("/users",userRouter);


export default app;

 



