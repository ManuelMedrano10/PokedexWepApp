import context from "../context/AppContext.js";

export function GetIndex(req, res, next) {
    context.PokemonsModel.findAll({ include: [
        { model: context.TypesModel, as: 'PrimaryType' }, 
        { model: context.TypesModel, as: 'SecondaryType' }, 
        { model: context.RegionsModel }] })
        .then((result) => {
            const pokemons = result.map((result) => result.get({ plain: true }));

            res.render("pokemons/index", {
                pokemonsList: pokemons,
                hasPokemons: pokemons.length > 0,
                "page-title": "Pokemons list"
            });
        })
        .catch((err) => {
            console.error("Error fetching pokemons: ", err);
        });
}

export function GetCreate(req, res, next) {
    context.TypesModel.findAll()
        .then((result) => {
            const types = result.map((result) => result.dataValues);

            context.RegionsModel.findAll()
                .then((result) => {
                    const regions = result.map((result) => result.dataValues);

                    res.render("pokemons/save", {
                        editMode: false,
                        typesList: types,
                        hasTypes: types.length > 0,
                        regionsList: regions,
                        hasRegions: regions.length > 0,
                        "page-title": "New pokemon"
                    })
                })
                .catch((err) => {
                    console.error("Error fetching pokemons:", err);
                });
        })
        .catch((err) => {
            console.error("Error fetching pokemons:", err);
        });
}

export function PostCreate(req, res, next) {
    const name = req.body.name;
    const photo = req.body.photo;
    const regionId = req.body.regionId;
    const primaryTypeId = req.body.primaryTypeId;
    const secondaryTypeId = req.body.secondaryTypeId;

    context.PokemonsModel.create({
        name: name,
        photo: photo,
        regionId: regionId,
        primaryTypeId: primaryTypeId,
        secondaryTypeId: secondaryTypeId
    }).then(() => {
        return res.redirect("/pokemons/index");
    })
        .catch((err) => {
            console.error("Error creating pokemon: ", err);
        });
}

export function GetEdit(req, res, next) {
    const id = req.params.pokemonId;

    context.PokemonsModel.findOne({ where: { id: id } })
        .then((result) => {
            if (!result) {
                return res.redirect("/pokemons/index");
            }

            const pokemon = result.dataValues;

            context.TypesModel.findAll()
                .then((result) => {
                    const types = result.map((result) => result.dataValues);

                    context.RegionsModel.findAll()
                        .then((result) => {
                            const regions = result.map((result) => result.dataValues);

                            res.render("pokemons/save", {
                                editMode: true,
                                pokemon: pokemon, typesList: types,
                                hasTypes: types.length > 0,
                                regionsList: regions,
                                hasRegions: regions.length > 0,
                                "page-title": `Edit Pokemon ${pokemon.name}`
                            });
                        })
                        .catch((err) => {
                            console.error("Error fetching pokemons: ", err);
                        });
                }).catch((err) => {
                    console.error("Error fetching pokemons: ", err);
                });
        });
}

export function PostEdit(req, res, next) {
    const id = req.body.pokemonId;
    const name = req.body.name;
    const photo = req.body.photo;
    const regionId = req.body.regionId;
    const primaryTypeId = req.body.primaryTypeId;
    const secondaryTypeId = req.body.secondaryTypeId;

    context.PokemonsModel.findOne({ where: { id: id } })
        .then((result) => {
            if (!result) {
                return res.redirect("/pokemons/index");
            }

            context.PokemonsModel.update(
                {
                    name: name,
                    photo: photo,
                    regionId: regionId,
                    primaryTypeId: primaryTypeId,
                    secondaryTypeId: secondaryTypeId
                },
                { where: { id: id } }
            )
                .then(() => {
                    return res.redirect("/pokemons/index");
                })
                .catch((err) => {
                    console.error("Error updating pokemons: ", err);
                });
        })
        .catch((err) => {
            console.error("Error fetching pokemons: ", err);
        });
}

export function Delete(req, res, next) {
    const id = req.body.pokemonId;

    context.PokemonsModel.findOne({ where: { id: id } })
        .then((result) => {
            if (!result) {
                return res.redirect("/pokemons/index");
            }

            context.PokemonsModel.destroy({ where: { id: id } })
                .then(() => {
                    return res.redirect("/pokemons/index");
                })
                .catch((err) => {
                    console.error("Error deleting pokemons: ", err);
                });
        })
        .catch((err) => {
            console.error("Error fetching pokemons: ", err);
        });
}