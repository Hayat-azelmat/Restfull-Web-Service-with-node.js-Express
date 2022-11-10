const express= require("express");
const router= express.Router();
const Studentscontroller = require("../controllers/studentscontroller");


//request all students
router.all("/", (req,res,next)=>{
    console.log("request recieved on students collection");
    next();
});

router.get("/", Studentscontroller.getallstudents);

// parameter middlware
router.param("id", (req,res,nxt,val)=> {
    //validation of parameter
    if(Number(val)) {
    //add param as prop of req
    req.id=val;
    nxt();
    }
    else{
        res.send("invalid id ");
    }

});
//request students by id : id is a parameter
router.get("/:id",Studentscontroller.getstudentbyid );

// create new student
router.post("/",Studentscontroller.addstudent);
//delete existing student
router.delete("/:id ",Studentscontroller.deletestudent );
//update 
router.put("/:id",Studentscontroller.updatestudent);

module.exports=router;