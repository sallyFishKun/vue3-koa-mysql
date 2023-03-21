const koa = require("koa");
const Router = require("koa-router");
const app = new koa();
const router = new Router();
// 搭建服务
app.use((ctx, next) => {
  ctx.status = 200;
  console.log(ctx.request.url, "url");
  ctx.response.body = "get index00";
});
router.get("/index", async (ctx) => {
  ctx.status = 200;
  ctx.response.body = "get index";
});
router.get("/index2", async (ctx) => {
  ctx.status = 200;
  ctx.body = "get index22";
});
// 配置路由
app.use(router.routes()).use(router.allowedMethods());
app.listen(5000, () => {
  console.log("启动成功");
});
