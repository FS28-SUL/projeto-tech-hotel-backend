import express from "express"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "./src/docs/swagger-output.json" with { type: "json"}

import funcionariosRoutes from "./src/routes/funcionarioRoutes.js";
import cargosRoutes from "./src/routes/cargoRoutes.js";

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/", (req, res) => {
    res.redirect("/docs");
});

app.use("/funcionarios", funcionariosRoutes);
app.use("/cargos", cargosRoutes);

app.listen(3000, () => {
    console.log("Serviço de pé: http://localhost:3000")
});
