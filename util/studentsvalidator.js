const Ajv= require("ajv");
//create schema
const schema = {
    "type":"object",
    "properties":{
        "name":{
            "type":"string",
            //"pattern":"^[A–Z][a-z]*$" 
        },
        "depart":{
            "type":"string",
            "enum":["info","phil","math"],
            "maxLength":4,
            "minLength":4
        }, 
    },
    "required":["name","depart"],
    "maxProperties":2,
    "minProperties":2
};
// create the validateur
const ajv=new Ajv();
module.exports=ajv.compile(schema);