const path = require("path");
const crypto = require("crypto");
var fs = require("fs");
function onData(data) {
  data = data.trim();
  // console.log(data, "-----data-----");
  var arr = data ? JSON.parse(data) : [];
  if (!arr || (arr.length == 1 && !arr[0])) {
    arr = [];
  }
  return arr;
}

function add(filePath, str) {
  console.log(str, "-----msg add--------");
  return new Promise((resolve, reject) => {
    //如果添加一条数据得首先得读取一下数据
    fs.readFile(filePath, "utf-8", async (err, data) => {
      if (!err) {
        let arr = data;
        if (arr && typeof arr == "string") {
          arr = JSON.parse(data); // onData();
        }
        // str = JSON.parse(str);
        const id = str.pid;
        console.log(arr, "-------------arrrrrrrrrr", id);
        str.id = crypto.randomUUID();
        if (Array.isArray(arr) && arr.length > 0) {
          //遍历数组
          let is = false;
          for (var i = 0; i < arr.length; i++) {
            console.log(arr[i].id == id, arr[i].id, "-----------99--arrrrrrrrrr", id);
            if (id == arr[i].id) {
              is = true;
              arr[i].list.push(str);
            }
          }
          if (!is) {
            arr.push({ id, list: [str] });
          }
        } else {
          console.log(arr.length);
          arr = [{ id, list: [str] }];
          console.log(id, "---------arr----id", arr);
        }

        var arr_str = JSON.stringify(arr);

        console.log(Object.keys(str), "写入数据---------arr----id", arr);
        //写入数据
        fs.writeFile(filePath, arr_str, (err) => {
          if (!err) {
            console.log("添加成功");
            resolve(str);
          } else {
            reject(false);
          }
        });
      } else {
        console.log(err);
        reject(false);
      }
    });
  });
}

function read(filePath, obj) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", async (err, data) => {
      if (err) {
        reject(false);
        return;
      }
      let arr = data;
      if (arr && typeof arr == "string") {
        arr = JSON.parse(data);
      }
      const id = obj.id;
      if (id == "all") {
        resolve(arr);
        return;
      }
      //遍历数组
      for (var i = 0; i < arr.length; i++) {
        if (id == arr[i].id) {
          console.log(arr[i], "--------------arr[iiiiiiiii]");
          resolve(arr[i].list);
          return;
        }
      }

      resolve([]);
    });
  });
}
function del(filePath, str) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", async (err, data) => {
      if (err) {
        reject(false);
        return;
      }
      // data = data.trim();
      // var arr = data ? JSON.parse(data) : [];
      // if (!arr || (arr.length == 1 && !arr[0])) {
      //   arr = [];
      //   resolve([]);
      //   return;
      // }
      let arr = data;
      console.log(arr, "=======================");
      if (arr && typeof arr == "string") {
        arr = JSON.parse(data);
      }
      let newArr = [];
      for (var i = 0; i < arr.length; i++) {
        if (str.pid == arr[i].id) {
          console.log(arr, "newArr----------");
          newArr = arr[i].list.filter((item) => item.id != str.id);
          arr[i].list = newArr;
        }
      }
      console.log(arr, "newArr");
      fs.writeFile(filePath, JSON.stringify(arr), (err) => {
        if (!err) {
          resolve(newArr);
        } else {
          reject(false);
        }
      });
    });
  });
}
const responseMsg = (is, ctx) => {
  if (is) {
    ctx.body = {
      data: is,
      message: "请求成功！",
      status: 200,
    };
    return;
  }
  const errorMsg = {
    message: "请求失败",
    status: 500,
  };
  ctx.body = errorMsg;
};
module.exports = { add, read, del, responseMsg };
