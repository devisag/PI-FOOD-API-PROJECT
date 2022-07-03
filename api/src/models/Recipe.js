const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      len:{
        args: [3,255],
        msg: "El nombre debe contener entre 3 y 255 caracteres"
      }
    },
    summary: {
      type: DataTypes.TEXT,
    },
    score: {
      type: DataTypes.INTEGER
    },
    healthScore: {
      type: DataTypes.INTEGER 
    },
    steps: {
      type: DataTypes.TEXT,
    },
  });
};