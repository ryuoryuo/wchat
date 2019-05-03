const KoaRouter = require("koa-router");
const Koa = require("koa");
const cors = require("@koa/cors");
const socketio = require("socket.io");


const app = new Koa();

app.use(cors());
const router = new KoaRouter();

const server = require("http").createServer(app.callback());


const io = socketio(server);

const users = [];
const messages = [];

router.get("/users", async (ctx, next) => {
  ctx.body = users.length ? users : ["NO USERS"];
  next();
});

router.get("/messages", async (ctx, next) => {
  ctx.body = messages;
  next();
});

app.use(router.routes());
app.use(router.allowedMethods());

io.on("connection", socket => {
  let username = "Anonymous";

  socket.on("msg", msg => {
    const fullMessage = `${username}: ${msg}`;

    io.emit("chat message", fullMessage);

    messages.push(fullMessage);

    if (messages.length > 10) {
      messages.splice(0, 1);
    }
  });

  socket.on("add user", nickname => {
    username = nickname;

    users.push(nickname);

    io.emit("set users", users);
  });

  socket.on("disconnect", () => {
    io.emit("chat message", `${username} disconnected`);

    if (users.indexOf(username) !== -1) {
      const userIndex = users.indexOf(username);

      users.splice(userIndex, 1);

      io.emit("set users", users);
    }
  });
});

server.listen(process.env.PORT || 3000);
