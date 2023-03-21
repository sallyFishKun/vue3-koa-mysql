const Koa = require("koa");
const response_duration = require("./middleware/response_duration");
const response_header = require("./middleware/response_header");
const response_data = require("./middleware/response_data");
// const writefile_data = require("./middleware/writefile_data");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const app = new Koa();
const router = new Router();
const postRouter = require("./routes/post");
const msgRouter = require("./routes/msg");
const recipientRouter = require("./routes/recipient");
// const registerRouter = require("./routes")();

// app.use(require("koa-static")(__dirname + "/client/dist"));
app.use(bodyParser());
app.use(response_duration);
app.use(response_header);
msgRouter(app);
postRouter(app);
recipientRouter(app);

// app.use(router.routes()).use(router.allowedMethods());
app.listen(5000, () => {
  console.log("启动成功");
});
