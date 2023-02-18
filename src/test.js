
import express from "express";

const app = express();
const PORT =  4000;

const urlLogger = (req, res, next) => {
  console.log(req.baseUrl);
  next();
};

const timeLogger = (req, res, next) => {};

const securityLogger = (req, res, next) => {};
const protectorMiddleware = (req, res, next) => {};
app.use(urlLogger);
app.use(timeLogger);
app.use(securityLogger);
app.use(protectorMiddleware);

const home = (req,res) => {
  res.send("<h1>Home</h1>");
}

app.get("/",home);
app.get("/protected", (req, res) => res.send("<h1>Protected</h1>"));

// Codesandbox gives us a PORT :)

const Listening = () =>  {
    console.log("Listening !");
}

app.listen(PORT, Listening);
