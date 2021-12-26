module.exports = (sequelize, Sequelize) => {
  const Member = sequelize.define('member', {
    id: {
      field:'id',
      type: Sequelize.INTEGER,
      autoIncrement: 1,
      primaryKey: 1,
      allowNull: 0
    },
    username: {
      field: 'username',
      type: Sequelize.STRING,
      allowNull: 0
    },
    email: {
      field: 'email',
      type: Sequelize.STRING,
      allowNull: 0
    },
    Hash: {
      field: 'Hash',
      type: Sequelize.STRING,
      allowNull: 0
    },
    Salt: {
      field: 'Salt',
      type: Sequelize.STRING,
      allowNull: 0
    }
  }, 
  {
    tableName: 'member'
  });

  return Member;
};