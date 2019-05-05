import Koa from "koa";
import koaBody from "koa-bodyparser";
import helmet from "koa-helmet";
import cors from "@koa/cors";


const app = new Koa();

app.use(helmet());
app.use(koaBody());
app.use(cors());

export default app;
