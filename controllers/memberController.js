const db = require("../models");
const Member = db.members;

exports.findOne = async (username) => {
    return Member.findAll({ where: {username : `${username}`}});
};

exports.findOneByID = async (id) => {
  return Member.findAll({ where: {id : `${id}`}});
};

exports.findAll = (req, res) => {
  return db.sequelize.query(`select * from member where SUBSTRING_INDEX(email,"@",-1) <> "jei-2021.tn";
  `)
};

exports.create = async (req, res,hash,salt) => {
  const member = {
    "username": `${req.body.username}`,
    "email": `${req.body.email}`,
    "Hash":`${hash}`,
    "Salt":`${salt}`
};
  return Member.create(member);
};