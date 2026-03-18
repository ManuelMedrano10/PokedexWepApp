import connection from "../utils/DbConnection.js";
import { DataTypes } from "sequelize";

const Pokemons = connection.define(
    "Pokemons",
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        photo:{
            type: DataTypes.STRING,
            allowNull: false
        },
        regionId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: "Regions",
                key: "id"
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        },
        primaryTypeId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: "Types",
                key: "id"
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        },
        secondaryTypeId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: "Types",
                key: "id"
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }
    },
    {
        tableName: "Pokemons"
    }
);

export default Pokemons;