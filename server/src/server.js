import http from "http";
import app from "./app";


const server = http.createServer(app.callback());

server.listen(process.env.PORT || 3000);
