const Router = require("koa-router");
const router = new Router();
var fs = require("fs");
const path = require("path");
let f = "../data/post.json";
f = path.join(__dirname, f);
const handle = require("../utils/handle");

function init() {}

router.post("/api/post/detail", async (ctx, next) => {
  console.log(111, "-----post read--------");
  const is = await read(f, ctx.request.body);
  handle.responseMsg(is, ctx);
  next();
});
router.get("/api/post/list", async (ctx, next) => {
  console.log(111, "-----post read--------");
  const is = await read(f, "list");
  handle.responseMsg(is, ctx);
  next();
});
router.post("/api/post/eidt", async (ctx, next) => {
  console.log(ctx.request.body, "-----post eidt--------");
  const is = await eidt(f, ctx.request.body);
  handle.responseMsg(is, ctx);
  next();
});
router.get("/api/post/del", async (ctx, next) => {
  console.log(ctx.request.query, "-----post del--------");
  const is = await del(f, ctx.request.query);
  handle.responseMsg(is, ctx);
  next();
});
// router.post("/api/msg/add", async (ctx, next) => {
//   console.log(ctx.request.body, "-----msg add--------");
//   // const is = await handle.read(f, ctx.request.body);
//   responseMsg(is, ctx);
//   next();
// });
const getPath = () => {};

function read(filePath, obj) {
  console.log(obj, "-----post read--------");
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", async (err, data) => {
      if (err) {
        console.log(err, "eeeeee");
        reject(false);
        return;
      }
      const arr = JSON.parse(data);
      if (obj === "list") {
        resolve(arr);
        return;
      }

      //遍历数组
      for (var i = 0; i < arr.length; i++) {
        if (obj.id == arr[i].id) {
          resolve(arr[i]);
          console.log(arr[i], "----------");
          return;
        }
      }
      resolve([]);
    });
  });
}
function eidt(filePath, str) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (!err) {
        //将拿到的数据反序列化成数组
        var arr = JSON.parse(data);
        console.log("str-------eidt--------", str);
        // str = JSON.parse(str);
        //遍历数组
        for (var i = 0; i < arr.length; i++) {
          if (str.id == arr[i].id) {
            arr[i] = str;
          }
        }
        //写入数据
        fs.writeFile(filePath, JSON.stringify(arr), (err) => {
          if (!err) {
            console.log("修改成功");
            resolve(true);
          } else {
            reject(false);
          }
        });
      } else {
        reject(false);
      }
    });
  });
}
function del(filePath, str) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (!err) {
        //拿到数据之后将数据反序列化成数组方便操作
        var arr = JSON.parse(data);
        arr = arr.filter((item) => item.id !== str.id);
        fs.writeFile(filePath, JSON.stringify(arr), (err) => {
          if (!err) {
            console.log("删除成功");
            resolve(arr);
          } else {
            reject(false);
          }
        });
      }
    });
  });
}

module.exports = (app) => app.use(router.routes()).use(router.allowedMethods());
