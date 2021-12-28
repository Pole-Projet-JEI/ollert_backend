const {Router} = require("express")
const router = Router()
const db = require("../models");

router.get("/todo/:id",async (req,res)=>{

    const id_project = req.params.id;
try{
    data = await db.sequelize.query(`SELECT task.* FROM task
    join state on (task.id_state=state.id)
   where UPPER(state.state) = "A FAIRE" and task.id_project = '${id_project}'`)
   data[0].forEach(element => {
    delete element['createdAt'];
    delete element['updatedAt'];
});
   res.status(200).json(data[0]);
}catch(err)
{
    res.status(400).json({"msg":err})
}
});
router.get("/doing/:id",async (req,res)=>{
    const id_project = req.params.id;
    try{
        data = await db.sequelize.query(`SELECT task.* FROM task
        join state on (task.id_state=state.id)
       where UPPER(state.state) = "EN COURS" and task.id_project = '${id_project}'`)
       data[0].forEach(element => {
        delete element['createdAt'];
        delete element['updatedAt'];
    });
       res.status(200).json(data[0]);
        }catch(err)
    {
        res.sendStatus(400).json({"msg":err})
    }
});

router.get("/done/:id",async (req,res)=>{
        const id_project = req.params.id;
        try{
            data = await db.sequelize.query(`SELECT task.* FROM task
             join state on (task.id_state=state.id)
            where UPPER(state.state) = "FAIT" and task.id_project = '${id_project}'`)
            data[0].forEach(element => {
                delete element['createdAt'];
                delete element['updatedAt'];
            });
            res.status(200).json(data[0]);
        }catch(err)
        {
            res.status(400).json({"msg":err})
        }
});

router.put("/todo/:id",async(req,res)=>{
    const id_task=req.params.id;
    try{
        const data = await db.sequelize.query(`SELECT * FROM state
       where UPPER(state.state) = "A FAIRE"`)
       const data1=await db.sequelize.query(`UPDATE task set id_state = "${data[0][0].id}"
       where id = ${id_task}`)
       res.status(200).json(data1);
    }catch(err){
            res.status(400).json({"msg":err})
    }

})
router.put("/doing/:id",async(req,res)=>{
    const id_task=req.params.id;
    try{
        const data = await db.sequelize.query(`SELECT * FROM state
       where UPPER(state.state) = "EN COURS"`)
       const data1=await db.sequelize.query(`UPDATE task set id_state = "${data[0][0].id}"
       where id = ${id_task}`)
       res.status(200).json(data1);
    }catch(err){
            res.status(400).json({"msg":err})
    }

})
router.put("/done/:id",async(req,res)=>{
    const id_task=req.params.id;
    try{
        const data = await db.sequelize.query(`SELECT * FROM state
       where UPPER(state.state) = "FAIT"`)
       const data1=await db.sequelize.query(`UPDATE task SET id_state = ${data[0][0].id}
       WHERE id = ${id_task}`)
       res.status(200).json(data1);
    }catch(err){
            res.status(400).json({"msg":err})
    }

})

router.delete("/delete/:id",async (req,res) => {
    try{
        const data = await db.sequelize.query(`DELETE FROM task where 
        id ='${req.params.id}'`)
        res.status(200).json(data)
    }catch(err){
            res.status(400).json({"msg":err})
    }
})
router.post("/add/",async (req,res) => {
    const name= req.body.name;
    const description=req.body.description;
    const deadline=req.body.deadline;
    const id_project=req.body.id_project;
    const now= new Date().toISOString().slice(0, 19).replace('T', ' ')
    try{
        const data1 = await db.sequelize.query(`SELECT * FROM state
       where UPPER(state.state) = "A FAIRE"`)
        const data = await db.sequelize.query(`INSERT INTO task(name,description,deadline,id_project,id_state,createdAt,updatedAt)
        VALUES("${name}","${description}","${deadline}",${id_project},${data1[0][0].id},'${now}','${now}')`)
        res.status(200).json(data)
    }catch(err){
            res.status(400).json({"msg":err})
    }
})


module.exports = router;