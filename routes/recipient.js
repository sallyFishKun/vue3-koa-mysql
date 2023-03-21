const Router = require("koa-router");
const router = new Router();
var fs = require("fs");
const path = require("path");
let f = "../data/recipient.json";
f = path.join(__dirname, f);
const handle = require("../utils/handle");

router.post("/api/recipient/add", async (ctx, next) => {
  console.log(ctx.request.body, "-----msg add--------");
  const is = await handle.add(f, ctx.request.body);
  handle.responseMsg(is, ctx);
  next();
});
router.post("/api/recipient/list", async (ctx, next) => {
  console.log(ctx.request.body, "-----recipient/list--------");
  const is = await handle.read(f, ctx.request.body);
  handle.responseMsg(is, ctx);
  next();
});
router.post("/api/recipient/del", async (ctx, next) => {
  console.log(ctx.request.body, "-----recipient/del--------");
  const is = await handle.del(f, ctx.request.body);
  handle.responseMsg(is, ctx);
  next();
});
// router.prefix("/msg");
module.exports = (app) => app.use(router.routes()).use(router.allowedMethods());
