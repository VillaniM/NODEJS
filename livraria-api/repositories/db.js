import Sequelize from "sequelize";

const sequelize = new Sequelize(
    "postgres:https://www.elephantsql.com/",
    {
        dialect: "postgres",
        define: {
            //grava automaticamente data e hora de criação/alteração
            timestamps: false
        }
    }
)
    
export default sequelize;