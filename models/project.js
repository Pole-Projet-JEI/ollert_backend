module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define('project', {
      id: {
        field:'id',
        type: Sequelize.INTEGER,
        autoIncrement: 1,
        primaryKey: 1,
        allowNull: 0
      },
      name: {
        field: 'name',
        type: Sequelize.STRING,
        allowNull: 0
      },
      type: {
        field: 'type',
        type: Sequelize.STRING,
        allowNull: 0
      },
      description: {
        field: 'description',
        type: Sequelize.STRING,
        allowNull: 0
      },
      deadline: {
        field: 'deadline',
        type: Sequelize.DATE,
        allowNull: 0
      },
      id_manager: {
        field: 'id_manager',
        type: Sequelize.INTEGER,
        allowNull: 0
      }
    }, 
    {
      tableName: 'project'
    });
  
    return Project;
  };