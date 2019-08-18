const mongoose = require('mongoose');
// 连接mongodb的服务器
const  db = mongoose.createConnection("mongodb://localhost:27017/user",{ useNewUrlParser: true } );
// 用原生的es6的promise取代mongoose自实现的promise
mongoose.Promise = global.Promise;

db.on("error", console.log.bind(console, "user数据库连接失败"));

db.on("open",() => {
    console.log("user数据库连接成功")
});

// 在操作数据库之前，得使用schema设置每个字段的数据类型
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    age: Number,
    password: {
        type: String,
        default: 'admin'
    }
},{
    versionKey: false
});

let data = ({"name": "admin","age": "18","password": "123456"});

const user = db.model("user",userSchema);

const d2 =  new user(data);

d2.save().then(res=>{
    console.log(res);
}).catch(err=>{
    console.log(err);
});