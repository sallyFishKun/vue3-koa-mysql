const Router = require("koa-router");
const router = new Router();
var fs = require("fs");
const path = require("path");
let f = "../data/msg.json";
f = path.join(__dirname, f);
const handle = require("../utils/handle");

router.post("/api/msg/add", async (ctx, next) => {
  console.log(ctx, "-----msg add--------");
  const is = await handle.add(f, ctx.request.body);
  handle.responseMsg(is, ctx);
  next();
});
router.post("/api/msg/list", async (ctx, next) => {
  console.log(ctx.request.body, "-----msg list--------");
  const is = await handle.read(f, ctx.request.body);
  handle.responseMsg(is, ctx);
  next();
});
router.post("/api/msg/del", async (ctx, next) => {
  console.log(ctx, "-----msg del--------");
  const is = await handle.del(f, ctx.request.body);
  handle.responseMsg(is, ctx);
  next();
});
// router.prefix("/msg");
module.exports = (app) => app.use(router.routes()).use(router.allowedMethods());
