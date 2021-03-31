const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Videogame = sequelize.define('videogame', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    launch: {
      type: DataTypes.DATE,
    },
    rating: {
      type: DataTypes.INTEGER
    },
    plataforms: { 
      type: DataTypes.JSON,
      allowNull: false,
    },
   }, { timestamps: false });
  };
