import express from "express";
import { buscar, criar, deletar, editar } from "../controllers/cargoController.js";

const router = express.Router();

/*  #swagger.tags = ['Cargos']
    #swagger.description = 'Rotas para gerenciar cargos'
*/
/*  #swagger.definitions['Cargo'] = {
      id: 1,
      nome: 'Recepcionista'
}
*/
/*  #swagger.definitions['CargoResponse'] = {
      tipo: 'success',
      mensagem: 'Registro criado com sucesso'
}
*/
/*  #swagger.definitions['CargoWarning'] = {
      tipo: 'warning',
      mensagem: 'Mensagem de warning ou objeto retornado'
}
*/
/*  #swagger.definitions['CargoError'] = {
      tipo: 'error',
      mensagem: 'Error: mensagem de erro'
}
*/

router.get("/", async (req, res) => {
    // Listar cargos
    /*  #swagger.tags = ['Cargos']
        #swagger.summary = 'Listar todos os cargos'
        #swagger.responses[200] = {
          description: 'Lista de cargos',
          schema: [{ $ref: '#/definitions/Cargo' }]
        }
        #swagger.responses[400] = {
          description: 'Erro ao buscar cargos',
          schema: { $ref: '#/definitions/CargoError' }
        }
    */
    res.json(await buscar());
});

router.post("/", async (req, res) => {
    // Criar cargo
    /*  #swagger.tags = ['Cargos']
        #swagger.summary = 'Criar novo cargo'
        #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Objeto cargo',
          required: true,
          schema: { nome: 'Recepcionista' }
        }
        #swagger.responses[200] = {
          description: 'Registro criado com sucesso',
          schema: { tipo: 'success', mensagem: 'Registro criado com sucesso' }
        }
        #swagger.responses[400] = {
          description: 'Warning na criação',
          schema: { tipo: 'warning', mensagem: 'Mensagem de warning ou objeto retornado' }
        }
        #swagger.responses[500] = {
          description: 'Erro interno',
          schema: { tipo: 'error', mensagem: 'Error: mensagem de erro' }
        }
    */
    res.json(await criar(req.body));
});

router.put("/:id", async (req, res) => {
    // Editar cargo
    /*  #swagger.tags = ['Cargos']
        #swagger.summary = 'Editar cargo por id'
        #swagger.parameters['id'] = { description: 'ID do cargo', required: true, type: 'integer' }
        #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Dados do cargo',
          required: true,
          schema: { id: 1, nome: 'Gerente' }
        }
        #swagger.responses[200] = {
          description: 'Registro atualizado com sucesso',
          schema: { tipo: 'success', mensagem: 'Registro atualizado com sucesso' }
        }
        #swagger.responses[400] = {
          description: 'Warning na edição',
          schema: { tipo: 'warning', mensagem: 'Mensagem de warning ou objeto retornado' }
        }
        #swagger.responses[500] = {
          description: 'Erro interno',
          schema: { tipo: 'error', mensagem: 'Error: mensagem de erro' }
        }
    */
    res.json(await editar(req.body));
});

router.delete("/:id", async (req, res) => {
    // Deletar cargo
    /*  #swagger.tags = ['Cargos']
        #swagger.summary = 'Deletar cargo por id'
        #swagger.parameters['id'] = { description: 'ID do cargo', required: true, type: 'integer' }
        #swagger.responses[200] = {
          description: 'Registro deletado com sucesso',
          schema: { tipo: 'success', mensagem: 'Registro deletado com sucesso' }
        }
        #swagger.responses[400] = {
          description: 'Warning na exclusão',
          schema: { tipo: 'warning', mensagem: 'Mensagem de warning ou objeto retornado' }
        }
        #swagger.responses[500] = {
          description: 'Erro interno',
          schema: { tipo: 'error', mensagem: 'Error: mensagem de erro' }
        }
    */
    res.json(await deletar(req.params.id));
});

export default router;