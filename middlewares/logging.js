// custom middleware (application-level middleware : loggin
module.exports=((req,res,next)=>{
    console.log("logging -----");
    next(); 
});