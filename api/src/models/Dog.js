const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
// Here we define the properties of the table 'razas', using unique id and the corresponding configs
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('razas', {
    id:{
      type: DataTypes.UUID, //Unique ID 
      defaultValue: DataTypes.UUIDV4, // Genera el id
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight:{
      type: DataTypes.STRING,
      allowNull: false
    },
    image:{
      type: DataTypes.STRING,
      allowNull: true
    },
    lifespan:{
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true
    },
    createdInDb:{  // Por si se quiere llamar a todo lo que se creo en base de datos
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};
