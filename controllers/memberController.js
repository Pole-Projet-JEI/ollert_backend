const db = require("../models");
const Member = db.members;

exports.findOne = async (username) => {
    return Member.findAll({ where: {username : `${username}`}});
};

exports.findOneByID = async (id) => {
  return Member.findAll({ where: {id : `${id}`}});
};

exports.findAll = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  Member.findAll({ where: { username : `%${username}%`, password: `%${password}%`}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving member."
      });
    });
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