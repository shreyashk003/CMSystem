const mongodb=require('mongodb')

const uri="mongodb://localhost:27017/ComplaintManagementSystem";

var db=""
const myconnection=new mongodb.MongoClient(uri);
try{
    myconnection.connect()
    db=myconnection.db("ComplaintManagementSystem")

    console.log("connected to Mongodb")

}catch(err){
    console.log(err)
}

module.exports=db