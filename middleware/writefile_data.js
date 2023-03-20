var fs = require("fs");

const crypto = require("crypto");
const Msg = require("./msg");
const path = require("path");
module.exports = async (ctx, next) => {
  // user
  const url = ctx.request.url;
  let filePath = url.replace("/api", "");
  let is = false;
  const str = await paresPostData(ctx);
  console.log(str, "--------sssssssssssss");
  if (filePath.indexOf("/post") != -1) {
    filePath = filePath.replace("/post", "");

    is = await post(filePath, str);
  }
  if (filePath.indexOf("/msg") != -1) {
    filePath = filePath.replace("/msg", "");
    console.log(filePath, "----------------mmmmmmmm", str);
    is = await msg(filePath, str);
  }
  if (is) {
    ctx.body = {
      data: is,
      message: "请求成功！",
      status: 200,
    };
  } else {
    const errorMsg = {
      message: "请求失败",
      status: 500,
    };
    ctx.body = errorMsg;
  }
  next();
};
const msg = async (filePath, str) => {
  let f = "../data/msg.json";
  f = path.join(__dirname, f);
  if (filePath === "/add") {
    const is = await Msg.addMsg(f, str);
    return is;
  }
  if (filePath === "/list") {
    console.log("ssss----------------", str, "---------");
    if (!str) return false;
    const is = await Msg.readMsg(f, str);
    return is;
  }
  return false;
};
async function post(filePath, str) {
  let f = "../data/post.json";
  console.log(f, "ne-------------filePath", filePath);
  f = path.join(__dirname, f);
  if (filePath === "/new") {
    const is = await add(f, str);
    return is;
  }
  if (filePath === "/list") {
    const is = await read(f);
    return is;
  }
  if (filePath === "/detail") {
    const is = await read(f, str);
    return is;
  }
  return false;
}

function read(filePath, obj) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", async (err, data) => {
      if (err) {
        reject(false);
        return;
      }
      const arr = JSON.parse(data);
      if (!obj) {
        resolve(arr);
        return;
      }
      const id = JSON.parse(obj).id;
      console.log("id---------------", id);
      //遍历数组
      for (var i = 0; i < arr.length; i++) {
        if (id == arr[i].id) {
          resolve(arr[i]);
          return;
        }
      }
      reject(false);
    });
  });
}
// 写
function wf(filePath, str) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, str, (err) => {
      if (!err) {
        console.log("存储成功");
        resolve(true);
      } else {
        reject(false);
      }
    });
  });
}
function add(filePath, str) {
  console.log("eeeeeeeee add");
  return new Promise((resolve, reject) => {
    //如果添加一条数据得首先得读取一下数据
    fs.readFile(filePath, "utf-8", async (err, data) => {
      console.log(err, "eeeeeeeee", data);
      if (!err) {
        //拿到的数据是string类型的，我们需要把他反序列化成为数组，然后才好操作数据的添加
        data = data.trim();
        console.log(data, "-----data-----");
        var arr = data ? JSON.parse(data) : [];
        if (!arr || (arr.length == 1 && !arr[0])) {
          arr = [];
        }
        console.log(data, "---------data", arr);
        //需要添加的那条数据
        console.log(str, "sssssssssssssssssss", crypto.randomUUID());

        if (str && typeof str === "string") {
          str = JSON.parse(str);
          str.id = crypto.randomUUID();

          var o = str;
          //利用数组的push方法把新的一条数据添加进去
          arr.push(o);
          console.log(arr, "arr");
          //我们存储的数据只是一些字符串，所以需要把数组序列化为字符串，以方便数据的写入
          var arr_str = JSON.stringify(arr);

          //写入数据
          fs.writeFile(filePath, arr_str, (err) => {
            if (!err) {
              console.log("存储成功");
              resolve(str.id);
            } else {
              reject(false);
            }
          });
        } else {
          resolve(true);
        }
      } else {
        console.log(err);
        reject(false);
      }
    });
  });
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
function eidt(filePath, str) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (!err) {
        //将拿到的数据反序列化成数组
        var arr = JSON.parse(data);
        //遍历数组
        for (var i = 0; i < arr.length; i++) {
          if (str.id == arr[i].id) {
            arr[i].names = "女帝";
          }
        }
        console.log(arr);

        //写入数据
        fs.writeFile(filePath, JSON.stringify(arr), (err) => {
          if (!err) {
            console.log("存储成功");
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
function paresPostData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postData = "";
      ctx.req.addListener("data", (data) => {
        console.log("data----------", data);
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
