import express from "express"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "./src/docs/swagger-output.json" with { type: "json"}

import funcionariosRoutes from "./src/routes/funcionarioRoutes.js";
import cargosRoutes from "./src/routes/cargoRoutes.js";
import { rotaProtegida } from "./src/middlewares/index.js";
import { logar } from "./src/controllers/funcionarioController.js";

const app = express();

//middlewares
app.get("/", (req, res) => {
    res.redirect("/docs");
});


app.use(cors());
app.use(express.json());

app.post("/logar", async (req, res) => {
    res.json(await logar(req.body));
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/funcionarios", funcionariosRoutes);
app.use("/cargos", rotaProtegida, cargosRoutes);

app.listen(3000, () => {
    console.log("Serviço de pé: http://localhost:3000")
});
