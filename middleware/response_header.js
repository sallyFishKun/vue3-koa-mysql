module.exports = async (ctx, next) => {
  const contentType = "application/json; charset=utf-8";
  ctx.set("Access-Control-Allow-Headers", " Origin, X-Requested-With, Content-Type, Accept");
  ctx.set("Content-Type", contentType);
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
  // ctx.response.body = '{"success":true}'
  await next();
};
