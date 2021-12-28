const { Router } = require("express")
const utils=require("../lib/utils")
const router = Router() 
const memberController=require("../controllers/memberController")


router.post(
    "/login",
    (req,res,next)=>{
        console.log(req.body.username)
      memberController.findOne(req.body.username).then((member)=>{
        if(!member && member.length()==0)
        {
            res.status(401).json({success:false,msg:"could not find user"})
        }
        else{
            const isValid=utils.validPassword(req.body.password,member[0].dataValues.Hash,member[0].dataValues.Salt)

            if(isValid)
            {
                const tokenObject= utils.issueJWT(member[0].dataValues)
                res.status(200).json({success:true,email:member[0].dataValues.email,token:tokenObject.token,expiresIn:tokenObject.expires})
    
            }
            else{
                res.status(401).json({success:false,msg:"you entered a wrong password"})
            }
        }
                


      }).catch((err)=>{
          next(err)
      })
    }
)   
router.post(
    "/register",
    async (req,res,next)=>{
    const saltHash=utils.genPassword(req.body.password);
    const salt= saltHash.salt;
    const hash=saltHash.hash;
    try{
        const data = await memberController.create(req,res,hash,salt);
        console.log(data)
        const jwt=utils.issueJWT(data);
        res.json({success:true,member:data,token:jwt.token,expiresIn:jwt.expires});    
    }
    catch(err){
        res.json({erreur : err}) 
    }
    }
)   

module.exports = router;