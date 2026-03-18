import context from "../context/AppContext.js";

export function GetIndex(req, res, next) {
    context.TypesModel.findAll()
        .then((result) => {
            const types = result.map((result) => result.dataValues);

            res.render("types/index", {
                typesList: types,
                hasTypes: types.length > 0,
                "page-title": "Types list"
            });
        })
        .catch((err) => {
            console.error("Error fetching types: ", err);
        });
}

export function GetCreate(req, res, next) {
    res.render("types/save", {
        editMode: false,
        "page-title": "New Type"
    })
}

export function PostCreate(req, res, next) {
    const name = req.body.name;

    context.TypesModel.create({
        name: name
    })
        .then(() => {
            return res.redirect("/types/index");
        })
        .catch((err) => {
            console.error("Error creating pokemon type: ", err);
        });
}

export function GetEdit(req, res, next) {
    const id = req.params.typeId;

    context.TypesModel.findOne({ where: { id: id } })
        .then((result) => {
            if (!result) {
                return res.redirect("/types/index");
            }

            const type = result.dataValues

            res.render("types/save", {
                editMode: true,
                type: type,
                "page-title": `Edit Type ${type.name}`
            });
        })
        .catch((err) => {
            console.error("Error fetching types: ", err);
        });
}

export function PostEdit(req, res, next) {
    const id = req.body.typeId;
    const name = req.body.name;

    context.TypesModel.findOne({ where: { id: id } })
        .then((result) => {
            if (!result) {
                return res.redirect("/types/index");
            }

            context.TypesModel.update(
                { name: name },
                { where: { id: id } }
            )
                .then(() => {
                    return res.redirect("/types/index");
                })
                .catch((err) => {
                    console.error("Error updating types: ", err);
                });
        })
        .catch((err) => {
            console.error("Error fetching types: ", err);
        });
}

export function Delete(req, res, next) {
    const id = req.body.typeId;

    context.TypesModel.findOne({ where: { id: id } })
        .then((result) => {
            if (!result) {
                return res.redirect("/types/index");
            }

            context.TypesModel.destroy({ where: { id: id } })
                .then(() => {
                    return res.redirect("/types/index");
                })
                .catch((err) => {
                    console.error("Error deleting types: ", err);
                });
        })
        .catch((err) => {
            console.error("Error fetching types: ", err);
        });
}