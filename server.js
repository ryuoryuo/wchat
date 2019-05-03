const Koa = require("koa");
const socket = require("socket.io");


const app = new Koa();

const server = require("http").createServer(app.callback());


const io = socket(server);

io.on("connection", socket => {
  socket.on("msg", msg => {
    io.emit("chat message", msg);
  });
});

app.use(async ctx => {
  ctx.body = "Hello W3orld";
});

server.listen(process.env.PORT || 3000);
