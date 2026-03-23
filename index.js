import express from "express"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "./src/docs/swagger-output.json" with { type: "json"}

import funcionariosRoutes from "./src/routes/funcionarioRoutes.js";
import cargosRoutes from "./src/routes/cargoRoutes.js";
import tipoDocumentoRoutes from "./src/routes/tipoDocumentoRoutes.js";
import quartosRoutes from "./src/routes/quartoRoutes.js";
import pagamentosRoutes from "./src/routes/pagamentoRoutes.js";
import clientesRoutes from "./src/routes/clienteRoutes.js";
import acompanhantesRoutes from "./src/routes/acompanhanteRoutes.js";
import reservasRoutes from "./src/routes/reservaRoutes.js";
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
app.use("/tipos", rotaProtegida, tipoDocumentoRoutes);
app.use("/quartos", rotaProtegida, quartosRoutes);
app.use("/pagamentos", rotaProtegida, pagamentosRoutes);
app.use("/clientes", rotaProtegida, clientesRoutes);
app.use("/acompanhantes", rotaProtegida, acompanhantesRoutes);
app.use("/reservas", rotaProtegida, reservasRoutes);

app.listen(3000, () => {
    console.log("Serviço de pé: http://localhost:3000")
});
