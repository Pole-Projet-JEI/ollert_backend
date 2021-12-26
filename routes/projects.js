const {Router} = require("express")
const router = Router()
const db = require("../models");
const projectController= require("../controllers/projectController")


router.get("/", async (req,res) =>
{
    console.log("/projects")
        console.log((req.user)[0].email.split("@")[1])
        if((req.user)[0].email.split("@")[1]==="jei-2021.tn")
        {
            try{
                const data=await projectController.findByIDmanager((req.user)[0].id)
                res.status(200).json(data);
            }
            catch(err)
            {
                res.sendStatus(400).json({"msg":err})
            }

        }
        else
        {
            try{
                const result= await db.sequelize.query(`select * from project 
                join member_project on (project.id = member_project.id_project)
                where member_project.id_member ='${(req.user)[0].id}'`)
                res.status(200).send(result[0])
            }
            catch(err)
            {
               res.status(404).json({"msg":err})
            }

       }
})
router.post("/add",async(req,res)=>{
    if((req.user)[0].email.split("@")[1]==="jei-2021.tn")
        {
        const {name,type,description,deadline}= req.body;

        try{
           console.log((req.user)[0].id)
           res.status(200).json(await projectController.create(req,res,(req.user)[0].id))    
        }
        catch(err)
        {
            res.status(400).json({"msg":err }) 
        }
    }
    else
    {
        res.status(403).json({"msg":"you are not allowed to add project" }) 
    }
})
router.delete("/delete/:id",async(req,res)=>{
    if((req.user)[0].email.split("@")[1]==="jei-2021.tn")
        {
    const {id}= req.params    
        try{
            const result= await db.sequelize.query(`DELETE FROM project where id=${id}`)
            res.status(200).json({"msg":"Project deleted successfully"})    
        }
        catch(err)
        {
            res.status(400).json({"msg":err }) 
        }
    }
    else
    {
        res.status(403).json({"msg":"you are not allowed to delete project" }) 
    }

})


module.exports = router;