const Koa = require("koa");
const socket = require("socket.io");


const app = new Koa();

const server = require("http").createServer(app.callback());


const io = socket(server);

io.on("connection", socket => {
  let userNickname = "Anonymous";

  socket.on("msg", msg => {
    io.emit("chat message", `${userNickname}: ${msg}`);
  });

  socket.on("setNickname", nickname => {
    userNickname = nickname;
  });
});

app.use(async ctx => {
  ctx.body = "Hello W3orld";
});

server.listen(process.env.PORT || 3000);
