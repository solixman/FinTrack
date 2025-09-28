'use strict'

const {
    Model

} =require('sequelize');


module.exports =(sequelize,DataTypes)=>{

    class Test extends Model{

        
        static associate (models){
            
        }


    }

    Test.init({

        name:DataTypes.STRING,
        age:DataTypes.INTEGER,
        money:DataTypes.FLOAT,


    },
{
    sequelize,
    modelName:'Test',
    tableName:'tests',
    timestamps:true
});
return Test;

}