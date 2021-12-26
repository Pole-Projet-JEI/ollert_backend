const {Router} = require("express")
const router = Router()
const db = require("../models");
const memberController= require("../controllers/memberController")

router.get("/",async(req,res)=>{
    try{
        const data=await memberController.findAll(req,res);
        res.json(data[0])

    }catch(err){
        res.status(400).json({"msg":err})
    }
})




module.exports = router;