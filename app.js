import "./utils/LoadEnvConfig.js";
import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { projectRoot } from './utils/Paths.js';
import context from "./context/AppContext.js";
import typesRouter from "./routes/types-route.js";
import regionsRouter from "./routes/regions-route.js";
import pokemonsRouter from "./routes/pokemon-route.js";
import {GetSection} from "./utils/helpers/Hbs/Section.js";
import { Equals } from "./utils/helpers/Hbs/Compare.js";
import homeRouter from './routes/home-route.js';

const app = express();

//render engine
app.engine('hbs', engine({
    layoutsDir: "views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs",
    helpers: {
        eq: Equals,
        section: GetSection
    }
}));
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(express.static(path.join(projectRoot, 'public')));

//routes
app.use(homeRouter);
app.use('/types', typesRouter);
app.use('/regions', regionsRouter);
app.use('/pokemons', pokemonsRouter);
//404
app.use((req, res) => {
    res.status(404).render("404", { "page-title": "Page Not Found" });
});

//start server
context.sequelize
    .sync() //Use alter: true to update the schema of a table without losing the data
    .then(() => {
        app.listen(process.env.PORT || 5000);
    })
    .catch((err) => {
        console.error("Error connecting to the database: ", err);
    });