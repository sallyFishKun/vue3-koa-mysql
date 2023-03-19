const Koa = require("koa");
const response_duration = require("./middleware/response_duration");
const response_header = require('./middleware/response_header')
const response_data = require('./middleware/response_data');
const writefile_data=require('./middleware/writefile_data')
const Router = require("koa-router");
const app = new Koa();
const router=new Router();
app.use(require('koa-static')(__dirname + '/client/dist'))
app.use(response_duration)
app.use(response_header)

app.use(response_data)
 app.use(writefile_data)
// app.use(async (ctx)=>{
//     console.log('done')
// })
router.get('/index', async ctx => {
    ctx.status = 200;
    ctx.response.body = 'get index'
})
router.post('/api/user', async ctx => {
    ctx.status = 200;
    ctx.response.body = 'get index'
   
})

// 搭建服务
// app.use((ctx, next) => {
//     ctx.status = 200;
//     console.log(ctx.request.url, "url")
//     ctx.response.body = 'get index00'
// })
app.use(router.routes()).use(router.allowedMethods());
app.listen(5000, () => {
    console.log('启动成功')
})