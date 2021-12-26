const db = require("../models");
const Project = db.projects;


exports.findByIDmanager = async (id) => {
  return Project.findAll({ where: {id_manager : `${id}`}});
};


exports.create = async (req, res,id_manager) => {
  const project = {
    "name": `${req.body.name}`,
    "type": `${req.body.type}`,
    "description":`${req.body.description}`,
    "deadline":`${req.body.deadline}`,
    "id_manager":`${id_manager}`
};
  return Project.create(project);
};