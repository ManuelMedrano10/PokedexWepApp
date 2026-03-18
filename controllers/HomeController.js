import { Op } from "sequelize";
import context from "../context/AppContext.js";

export function GetHome(req, res, next) {
    context.PokemonsModel.findAll({
        include: [
            { model: context.TypesModel, as: 'PrimaryType' },
            { model: context.TypesModel, as: 'SecondaryType' },
            { model: context.RegionsModel }]
    })
        .then((result) => {
            const pokemons = result.map((result) => result.get({ plain: true }));
            context.TypesModel.findAll()
                .then((result) => {
                    const types = result.map((result) => result.dataValues);
                    context.RegionsModel.findAll()
                        .then((result) => {
                            const regions = result.map((result) => result.dataValues);

                            res.render("home/home", {
                                pokemonsList: pokemons,
                                regionsList: regions,
                                typesList: types,
                                hasPokemons: pokemons.length > 0,
                                "page-title": "Pokedex Home"
                            });
                        })
                })
                .catch((err) => {
                    console.error("Error fetching pokemons: ", err);
                })
                .catch((err) => {
                    console.error("Error fetching pokemons: ", err);
                });
        })
        .catch((err) => {
            console.error("Error fetching pokemons: ", err);
        });
}

export function GetByName(req, res, next) {
    const name = req.body.name;

    context.PokemonsModel.findAll({ where: { name: { [Op.like]: `%${name}%` } },
        include: [
                { model: context.TypesModel, as: 'PrimaryType' },
                { model: context.TypesModel, as: 'SecondaryType' },
                { model: context.RegionsModel }]
        })
        .then((result) => {
            const pokemons = result.map((result) => result.get({ plain: true }));
            context.TypesModel.findAll()
                .then((result) => {
                    const types = result.map((result) => result.dataValues);
                    context.RegionsModel.findAll()
                        .then((result) => {
                            const regions = result.map((result) => result.dataValues);

                            res.render("home/home", {
                                pokemonsList: pokemons,
                                regionsList: regions,
                                typesList: types,
                                hasPokemons: pokemons.length > 0,
                                "page-title": "Pokedex Home"
                            });
                        })
                })
                .catch((err) => {
                    console.error("Error fetching pokemons: ", err);
                })
                .catch((err) => {
                    console.error("Error fetching pokemons: ", err);
                });
        })
        .catch((err) => {
            console.error("Error fetching pokemons: ", err);
        });
}

export function GetByRegion(req, res, next) {
    const region = req.body.regionId;

    context.PokemonsModel.findAll({ where: { regionId: region } ,
        include: [
                { model: context.TypesModel, as: 'PrimaryType' },
                { model: context.TypesModel, as: 'SecondaryType' },
                { model: context.RegionsModel }]
        })
        .then((result) => {
            const pokemons = result.map((result) => result.get({ plain: true }));
            context.TypesModel.findAll()
                .then((result) => {
                    const types = result.map((result) => result.dataValues);
                    context.RegionsModel.findAll()
                        .then((result) => {
                            const regions = result.map((result) => result.dataValues);

                            res.render("home/home", {
                                pokemonsList: pokemons,
                                regionsList: regions,
                                typesList: types,
                                hasPokemons: pokemons.length > 0,
                                "page-title": "Pokedex Home"
                            });
                        })
                })
                .catch((err) => {
                    console.error("Error fetching pokemons: ", err);
                })
                .catch((err) => {
                    console.error("Error fetching pokemons: ", err);
                });
        })
        .catch((err) => {
            console.error("Error fetching pokemons: ", err);
        });
}

export function GetByType(req, res, next) {
    const type = req.body.typeId;

    context.PokemonsModel.findAll({ where: { [Op.or]: [{primaryTypeId: type}, {secondaryTypeId: type}] },
        include: [
                { model: context.TypesModel, as: 'PrimaryType' },
                { model: context.TypesModel, as: 'SecondaryType' },
                { model: context.RegionsModel }]
        })
        .then((result) => {
            const pokemons = result.map((result) => result.get({ plain: true }));
            context.TypesModel.findAll()
                .then((result) => {
                    const types = result.map((result) => result.dataValues);
                    context.RegionsModel.findAll()
                        .then((result) => {
                            const regions = result.map((result) => result.dataValues);

                            res.render("home/home", {
                                pokemonsList: pokemons,
                                regionsList: regions,
                                typesList: types,
                                hasPokemons: pokemons.length > 0,
                                "page-title": "Pokedex Home"
                            });
                        })
                })
                .catch((err) => {
                    console.error("Error fetching pokemons: ", err);
                })
                .catch((err) => {
                    console.error("Error fetching pokemons: ", err);
                });
        })
        .catch((err) => {
            console.error("Error fetching pokemons: ", err);
        });
}