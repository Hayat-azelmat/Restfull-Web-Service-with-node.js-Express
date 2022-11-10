const express= require("express");
const app= express();
const path= require("path");
const port= process.env.port || 9000;
const cookieParser= require("cookie-parser");
const helmet= require("helmet");
const ejs = require("ejs");
const logging = require("./middlewares/logging");
const studentsrouter = require("./routes/students");


//built-in middleware
app.use(express.urlencoded({extended : true})); // middleware
app.use(express.json());
app.use(cookieParser());
// 3rd party middlexare
app.use(helmet());
app.use(logging);
app.use("/students", studentsrouter);
app.use(express.static("public"));
//app.use("/assets",express.static("public"));


app.get("*",(req,res,next)=>{
    console.log("get request received !!!!");
    next();
});
      // app setting
      app.set("template engine", "ejs");
      // app.set("views","templates");
// route handler middleware
app.get("/",(req,res,next)=>{
    console.log("stage 1");
    next(); 
}, (req,res)=> {
    console.log("recienve.........");
    //res.send("this is server response ")
    res.sendFile(path.join(__dirname, "main.html"));
});


/**sending data via query string url?---- */
//query string
app.get("/welcome.html",(req,res)=>{
    console.log(req.query);
    console.log(req.query.fnm);
    console.log(req.query.lnm);
    res.sendFile(path.join(__dirname, "welcome.html"))
})
//require body
app.post("/welcome.html",(req,res)=>{
    console.log(req.body);
    res.cookie("username",req.body.fnm);// expires
    res.cookie("userlastname",Buffer.from(req.body.lnm).toString('base64'));// encryption
    res.cookie("userage",22, {httpOnly:true});
    res.send(`thanks for sending required data ${req.body.lnm}!!!!`);
});
app.get("/abc",(req,res)=> {
    console.log(Buffer.from(req.cookies.userlastname, "base64").toString());
    console.log(req.cookies.userage);
    res.sendStatus(200);
});



app.listen(port, ()=>{ console.log(`listennig to  ${port}  `)});