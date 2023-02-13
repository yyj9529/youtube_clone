import express from "express";
const app = express();

const handlehome = (req ,res) => {
    return res.send("I love you");
}

const handleLogin = (req ,res) =>{
    return res.send("Login here.");
}

app.get("/",handlehome);
app.get("/login",handleLogin);

const PORT = 4000;

const handleListening = () => {
    console.log(`Server Listening on port 4000 localhost${PORT}`);
}

app.listen(PORT,handleListening);