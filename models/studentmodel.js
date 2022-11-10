const fs= require("fs");
const path= require("path");
const studentpath = path.join(path.dirname(process.mainModule.filename),"data","student.json");
module.exports=class Student{
   constructor({name:nm,dp}){
    this.name=nm;
    this.depart=dp;
   }
   savestudent(){
    //student.push(this);
    //1- read file
    fs.readFile(studentpath,(err,info)=>{
        let students=[];
        if(!err){
            students= JSON.parse(info);
            //2- update data
            this.id=students.length+1;
            students.push(this);
            //3- write into file
            fs.writeFile(studentpath, JSON.stringify(students), (err)=>{
                console.log("error occcured");
            });
        }
    });

   }
   static fetchallstd(callback){
    //return student;
    fs.readFile(studentpath,(err,info)=>{
        if(!err){
            callback (JSON.parse(info));
        }
        else callback([]);
    })
   }
}
//{}