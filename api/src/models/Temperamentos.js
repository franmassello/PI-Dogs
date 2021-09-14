const { DataTypes } = require('sequelize');

// Here we define the properties of the table 'temperament', using the corresponding configs
module.exports = (sequelize) => {
    sequelize.define('temperament', {
        name: {
        type: DataTypes.STRING,
        allowNull: true
        }    
    })
}