import "./db";
import "./models/video";
import "./models/User";
import app from "./index";

const PORT = 4000;

const handleListening = () => {
    console.log(`Server Listening on port 4000 localhost${PORT}`);
}

app.listen(PORT,handleListening);