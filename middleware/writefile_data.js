var fs = require("fs");
const path = require("path");

module.exports = async (ctx, next) => {
  // user
  const url = ctx.request.url;
  let filePath = url.replace("/api", "");
  filePath = "../data" + filePath + ".json"; // /api/seller   ../data/seller.json
  filePath = path.join(__dirname, filePath);
  const str = await paresPostData(ctx);
  const is = await eidt(filePath, str);
  if (is) {
    console.log("存储成功");
    ctx.response.body = "存储成功";
  } else {
    const errorMsg = {
      message: "请求失败",
      status: 500,
    };
    ctx.response.body = JSON.stringify(errorMsg);
  }
  next(filePath, str);
};
async function wf(filePath, str) {
  await fs.writeFile(filePath, str, (err) => {
    if (!err) {
      console.log("存储成功");
      return true;
    }
  });
  return false;
}
async function add(filePath, str) {
  //如果添加一条数据得首先得读取一下数据
  await fs.readFile(filePath, "utf-8", async (err, data) => {
    if (!err) {
      //拿到的数据是string类型的，我们需要把他反序列化成为数组，然后才好操作数据的添加
      var arr = JSON.parse(data);
      //需要添加的那条数据
      var o = { id: 4, names: "中介", sex: "男", img: "" };
      //利用数组的push方法把新的一条数据添加进去
      arr.push(o);
      console.log(arr, "arr");
      //我们存储的数据只是一些字符串，所以需要把数组序列化为字符串，以方便数据的写入
      var arr_str = JSON.stringify(arr);

      //写入数据
      return await wf(filePath, arr_str);
    } else {
      console.log(err);
    }
  });
  return false;
}

async function remove(filePath, str) {
  await fs.readFile(filePath, "utf-8", async (err, data) => {
    if (!err) {
      //拿到数据之后将数据反序列化成数组方便操作
      var arr = JSON.parse(data);
      //循环遍历数组每一项
      for (var i = 0; i < arr.length; i++) {
        //if判断找到id为2的那一项
        if (i == 2) {
          //删除数组中的那一项
          arr.splice(i, 1);
        }
      }
      //打印数组看是否成功
      console.log(arr, "打印数组看是否成功");
      //一切就绪之后，再次写入数组
      return await wf(filePath, JSON.stringify(arr));
    }
  });
  return false;
}

// //删除数据之前也得先读取一下数据
// fs.readFile('./shuju.json','utf-8',(err,data)=>{
//     if(!err){
//         //拿到数据之后将数据反序列化成数组方便操作
//         var arr=JSON.parse(data);
//         //循环遍历数组每一项
//         for(var i=0;i<arr.length;i++){
//             //if判断找到id为2的那一项
//             if(arr[i].id==2){
//                 //删除数组中的那一项
//                 arr.splice(i,1);
//             }
//         }
//         //打印数组看是否成功
//         console.log(arr);
//         //一切就绪之后，再次写入数组
//         fs.writeFile('./shuju.json',JSON.stringify(arr),err=>{
//             if(!err){
//                 console.log('删除成功');
//             }
//             else{
//                 cponsole.log(err);
//             }
//         });
//     }
// })
// //
//修改数据
async function eidt(filePath, str) {
  fs.readFile(filePath, "utf-8", async (err, data) => {
    if (!err) {
      //将拿到的数据反序列化成数组
      var arr = JSON.parse(data);
      //遍历数组
      for (var i = 0; i < arr.length; i++) {
        if (i == 0) {
          arr[i].names = "女帝";
        }
      }
      console.log(arr);
      return await wf(filePath, JSON.stringify(arr));
    }
  });
  return false;
}
function paresPostData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postData = "";
      ctx.req.addListener("data", (data) => {
        postData += data;
      });
      ctx.req.on("end", () => {
        resolve(postData);
      });
    } catch (err) {
      reject(err);
    }
  });
}
