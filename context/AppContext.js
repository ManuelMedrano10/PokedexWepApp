import connection from "../utils/DbConnection.js";
import RegionsModel from "../models/RegionsModel.js";
import TypesModel from "../models/TypesModel.js";
import PokemonsModel from "../models/PokemonsModel.js";

//testing Sequelize connection
connection.authenticate()
    .then(() => {
        console.log("Database conenction has been established successfully.")
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

//relations
//pokemon-region relation
RegionsModel.hasMany(PokemonsModel, {foreignKey: "regionId"});
PokemonsModel.belongsTo(RegionsModel, {foreignKey: "regionId"});

//pokemon-types relation
TypesModel.hasMany(PokemonsModel, {foreignKey: "primaryTypeId"});
PokemonsModel.belongsTo(TypesModel, {foreignKey: "primaryTypeId"});

TypesModel.hasMany(PokemonsModel, {foreignKey: "secondaryTypeId"});
PokemonsModel.belongsTo(TypesModel, {foreignKey: "secondaryTypeId"});

export default{
    sequelize: connection,
    PokemonsModel,
    TypesModel,
    RegionsModel
}