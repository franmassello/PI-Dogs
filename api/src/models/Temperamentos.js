const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('temperamentos', {
        name: {
        type: DataTypes.STRING,
        allowNull: true
        }    
    })
}