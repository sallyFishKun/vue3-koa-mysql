const Koa = require("koa");
const response_duration = require("./middleware/response_duration");
const response_header = require('./middleware/response_header')
const response_data = require('./middleware/response_data')
const app = new Koa();
app.use(response_duration)
app.use(response_header)
app.use(response_data)

// 搭建服务
// app.use((ctx, next) => {
//     ctx.status = 200;
//     console.log(ctx.request.url, "url")
//     ctx.response.body = 'get index00'
// })

app.listen(5000, () => {
    console.log('启动成功')
})