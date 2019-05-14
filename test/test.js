const fs=require("fs")
    ,mocha=require("mocha")
    ,assert=require("assert")
    ,loader=require("./loader")
    
    ;
describe("fLOVERS",()=>{
    it("Reject images not image/*",(done)=>{
        
        loader.testImg("flower_labels.csv",(err,res,body)=>{
            if(err){
                done(err)
                return;
            }
            if(res.statusCode==200)
                done(res.statusCode)
        })
    })
})