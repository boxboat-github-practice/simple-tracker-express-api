const { DataTypes } = require("sequelize");

module.exports = function(sequelize) {
  const Employee = sequelize.define("employee", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    github: {
      type: DataTypes.STRING,
      allowNull: true
    }

  },
    {
      modelName: 'Employee'
    }
  )

  const Client = sequelize.define("client", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
    {
      modelName: 'Client'
    }
  )

  const Contract = sequelize.define("contract", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: Client,
          key: 'id'
        }
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
    })
    
  const History = sequelize.define("history", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    employeeId: {
      type: DataTypes.INTEGER,
      references: {
        model: Employee,
        key: 'id'
      }
    },
    employeeName: {
      type: DataTypes.STRING,
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: Client,
        key: 'id'
      }
    },
    clientName: {
      type: DataTypes.STRING,
    },
    contractId: {
      type: DataTypes.INTEGER,
      references: {
        model: Contract,
        key: 'id'
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true
    }
  })

  const Tech = sequelize.define("tech", {
    type: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    tableName: "tech",
    modelName: "tech"
  })

  Contract.hasMany(Tech, {onDelete: 'CASCADE', as: "tech"})
  Tech.belongsTo(Contract)
  Client.hasMany(Contract, { onDelete: 'CASCADE' })
  Employee.hasMany(History, {onDelete: 'CASCADE'})
  Contract.hasMany(History, {onDelete: 'CASCADE'})
}