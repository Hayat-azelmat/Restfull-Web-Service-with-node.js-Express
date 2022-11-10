const validator = require("../util/studentsvalidator");
const Student = require("../models/studentmodel");


const getallstudents= (req,res)=>{
    //res.json(student);
    res.set("Access-Control-Allow-Origin","*");
    Student.fetchallstd((obj)=>{
        res.render("students.ejs",{std: obj} );
    });
    
};


const getstudentbyid = (req,res)=>{
    //let id=req.params.id;
    let id=req.id;
    const std = Student.find((val,idx,arr)=>{return val.id==id;} )
    if(std)
       res.json(std);
    else 
       res.send("not founed")
};
const addstudent = (req,res)=>{
    let valid = validator(req.body);
    if(valid){
       console.log("val"); 
       let std = new Student(req.body);
       std.savestudent();
       res.json(req.body);
    }
    else {
        res.status(403).send(" comment non valid ");
        //res.sendStatus(403);
    }
};
const deletestudent =(req,res)=>{
    let idx = student.findIndex((val)=>{ return val.id == req.params.id});
    if(idx != -1){
    let deletestd = Student.splice(idx,1);
    res.send("one element deleted");
    }
    else{
        res.send("element not found");
    }
    };
    const updatestudent= (req,res)=>{
        let idx = Student.findIndex((val)=>{ return val.id == req.params.id});
        if(idx != -1){
           for(i in req.body){
            student[idx][i]=req.body[i];
           }
           res.json(student[idx]);
            }
            else{
                res.send("update is not allowed");
            }
        };
module.exports= {getallstudents,getstudentbyid, addstudent,deletestudent, updatestudent};