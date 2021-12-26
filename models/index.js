const Sequelize = require("sequelize");
const sequelize = new Sequelize("ollert_db","root","", {
  logging: false,
  host: "localhost",
  dialect:"mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  storage: 'path/to/database.sqlite',
  operatorsAliases: 0
});

   sequelize.authenticate().then(()=>{
    console.log('Connection has been established successfully.');
   });



const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.members = require("./member")(sequelize, Sequelize);
db.projects = require("./project")(sequelize, Sequelize);

module.exports = db;
