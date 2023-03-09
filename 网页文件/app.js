//加载express框架
var express = require("express");
//路径模块
var path = require("path");
//文件处理模块
const fs = require("fs");
//按行读取文件
var readLine = require("readline");
//formidable模块，解析表单，支持get post请求参数，文件上传
const formidable = require("formidable");
const { stdout } = require("process");
const { response } = require("express");
//创建同步的进程
const execSync = require('child_process').execSync;
//创建异步的进程
const exec = require("child_process").exec;
// const execa = require("execa");
var child_process = require("child_process");
 
//创建服务器应用程序
var app = express()
//静态资源访问服务功能
app.use(express.static(path.join(__dirname, "public")));
app.use(
    "/node_modules/",
    express.static(path.join(__dirname, "./node_modules/"))
);
app.use('/CSS/', express.static(path.join(__dirname, './CSS/')));
 

//Set Par
//用户上传参数
app.post("/formData", (req, res) => {
    //创建 formidable表单解析对象
    const form = new formidable.IncomingForm();
    //解析客户端传来的FormData对象
    form.parse(req, (err, fields, files) => {
        var a=JSON.stringify(fields)
        var b=a.replace('"[','[')
        var c=b.replace(']"',']')
        var c=c.replace('"}','}')
        var c=c.replace(":\"",":");
        fs.writeFile('../node/public/fedai_ndb/cloud_server/ndb_par.txt', c, err => {
            if (err) throw err;
        });
    });  
    //启动中央服务器
    // 异步执行


    const child9=exec('pythonw "../node/public/fedai_ndb/cloud_server/flow_control.py" SET_PAR',function(error,stdout,stderr){
    if(error) {
        console.info('stderr : '+stderr);
         }
    console.log(stdout);
    res.send(stdout);
    })
    process.on("exit",function(){
      
        child9.kill();
    })
});
//
//用户调用上传参数btn1过程，4个边缘服务器，4个边缘设备轮询
app.post("/text0", (req, res) => {
    var content = fs.readFile('./public/fedai_ndb/cloud_server/flow_control.log',function (err, data) {
        if (err) throw err
       else
        res.send(data.toString());
    
      })
});

app.post("/text1", (req, res) => {
    var content = fs.readFile('./public/fedai_ndb/edge_server/edge_server_1/server_1.log', function (err, data) {
        if (err) throw err
        res.send(data.toString());
      })
});
app.post("/text2", (req, res) => {
    var content =fs.readFile('./public/fedai_ndb/edge_server/edge_server_2/server_2.log', function (err, data) {
        if (err) throw err
        res.send(data.toString());
      })
});
app.post("/text3", (req, res) => {
    var content = fs.readFile('./public/fedai_ndb/edge_server/edge_server_3/server_3.log', function (err, data) {
        if (err) throw err
        res.send(data.toString());
      })
});
app.post("/text4", (req, res) => {
    var content = fs.readFile('./public/fedai_ndb/edge_server/edge_server_4/server_4.log', function (err, data) {
        if (err) throw err
        res.send(data.toString());
      })
});
app.post("/text5", (req, res) => {
    var content = fs.readFile('./public/fedai_ndb/edge_device/device_1/device_1.log', function (err, data) {
        if (err) throw err
        res.send(data.toString());
      })
});
app.post("/text6", (req, res) => {
    var content = fs.readFile('./public/fedai_ndb/edge_device/device_2/device_2.log', function (err, data) {
        if (err) throw err
        res.send(data.toString());
      })
});
app.post("/text7", (req, res) => {
    var content = fs.readFile('./public/fedai_ndb/edge_device/device_3/device_3.log', function (err, data) {
        if (err) throw err
        res.send(data.toString());
      })
});
app.post("/text8", (req, res) => {
    var content = fs.readFile('./public/fedai_ndb/edge_device/device_4/device_4.log', function (err, data) {
        if (err) throw err
        res.send(data.toString());
      })
});


//训练过程


app.post("/t1", (req, res) => {
    var content = fs.readFile('./public/fedai_ndb/edge_server/edge_server_1/train_1.log', function (err, data) {
        if (err) throw err
        res.send(data.toString());
      })
});
app.post("/t2", (req, res) => {
    var content =fs.readFile('./public/fedai_ndb/edge_server/edge_server_2/train_2.log', function (err, data) {
        if (err) throw err
        res.send(data.toString());
      })
});
app.post("/t3", (req, res) => {
    var content = fs.readFile('./public/fedai_ndb/edge_server/edge_server_3/train_3.log', function (err, data) {
        if (err) throw err
        res.send(data.toString());
      })
});
app.post("/t4", (req, res) => {
    var content = fs.readFile('./public/fedai_ndb/edge_server/edge_server_4/train_4.log', function (err, data) {
        if (err) throw err
        res.send(data.toString());
      })
});

//用户调用加密过程，
app.post("/start", (req, res) => {
    //调用云服务器
    // 异步执行
     exec('python "../node/public/fedai_ndb/cloud_server/flow_control.py" NDB_ENCODE ' ,function(error,stdout,stderr){
    if(error) {
        console.info('stderr : '+stderr);
         }
    console.log('exec: ' + stdout);
    res.send(stdout)
    })   
});
//STEP3
//用户调用训练过程
app.post("/draw", (req, res) => { 
    // 异步执行
    exec('python "public/fedai_ndb/cloud_server/fedai.py"' ,function(error,stdout,stderr){
    if(error) {
        console.info('stderr : '+stderr);
        res.send(stderr)
         }
    else
    console.log('exec: ' + stdout);
    res.send(stdout)
    })
});
app.listen(3000, function() {
    console.log("服务启动成功");
});