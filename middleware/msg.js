const path = require("path");
const crypto = require("crypto");
var fs = require("fs");
// module.exports = async (filePath, str) => {
//   let f = "../data/msg.json";
//   f = path.join(__dirname, f);
//   if (filePath === "/add") {
//     const is = await add(f, str);
//     return is;
//   }
//   if (filePath === "/list") {
//     console.log("ssss----------------", str, "---------");
//     if (!str) return false;
//     const is = await read(f, str);
//     return is;
//   }
//   return false;
// };

function addMsg(filePath, str) {
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
        if (str && typeof str === "string") {
          str = JSON.parse(str);
          const id = str.id;
          if (arr.length > 0) {
            //遍历数组
            for (var i = 0; i < arr.length; i++) {
              if (id == arr[i].id) {
                arr[i].list.push(str);
              }
            }
          } else {
            arr = [
              {
                id,
                list: [str],
              },
            ];
          }
          var arr_str = JSON.stringify(arr);
          //写入数据
          fs.writeFile(filePath, arr_str, (err) => {
            if (!err) {
              console.log("存储成功");
              resolve(str);
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
module.exports = { addMsg, readMsg };
function readMsg(filePath, obj) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", async (err, data) => {
      if (err) {
        reject(false);
        return;
      }
      data = data.trim();
      console.log(data, "-----data-----");
      var arr = data ? JSON.parse(data) : [];
      if (!arr || (arr.length == 1 && !arr[0])) {
        arr = [];
        resolve([]);
        return;
      }
      const id = JSON.parse(obj).id;
      console.log("id---------------", id, obj);
      console.log(arr, "--------------arr");

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
