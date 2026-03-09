import { PRISMA } from "../services/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function buscar() {
    try {
        return await PRISMA.funcionario.findMany({
            orderBy: {
                id: "asc"
            },
            include: {
                cargo: true
            }
        });
    } catch (error) {
        return {
            tipo: "error",
            mensagem: `Error: ${error.message}`
        }
    }
}

async function criar(dados) {
    try {
        let senhaCriptografada = await bcrypt.hash(dados.senha, 10);
        dados.senha = senhaCriptografada;

        const request = await PRISMA.funcionario.create({
            data: dados
        });

        if (request) {
            return {
                tipo: "success",
                mensagem: "Registro criado com sucesso"
            }
        }

        return {
            tipo: "warning",
            mensagem: request
        }


    } catch (error) {
        return {
            tipo: "error",
            mensagem: `Error: ${error.message}`
        }
    }
}

async function editar(dados) {
    try {
        let senhaCriptografada = await bcrypt.hash(dados.senha, 10);
        dados.senha = senhaCriptografada;

        const request = await PRISMA.funcionario.update({
            where: {
                id: Number(dados.id)
            },
            data: dados
        });

        if (request) {
            return {
                tipo: "success",
                mensagem: "Registro atualizado com sucesso"
            }
        }

        return {
            tipo: "warning",
            mensagem: request
        }


    } catch (error) {
        return {
            tipo: "error",
            mensagem: `Error: ${error.message}`
        }
    }
}

async function deletar(id) {
    try {
        const request = await PRISMA.funcionario.delete({
            where: {
                id: Number(id)
            }
        });

        if (request) {
            return {
                tipo: "success",
                mensagem: "Registro deletado com sucesso"
            }
        }

        return {
            tipo: "warning",
            mensagem: request
        }


    } catch (error) {
        return {
            tipo: "error",
            mensagem: `Error: ${error.message}`
        }
    }
}

async function logar(dados) {
    try {
        const funcionario = await PRISMA.funcionario.findFirst({
            where: {
                email: dados.email
            }
        });

        if (!funcionario) {
            return {
                tipo: "warning",
                mensagem: "Email ou senha incorretos"
            }
        }

        let senhaOk = await bcrypt.compare(dados.senha, funcionario.senha);

        if (senhaOk) {
            let token = await jwt.sign(funcionario, process.env.SEGREDO, { expiresIn: "1h"});
            delete funcionario.senha;
            return { token, funcionario }
        }

        return {
            tipo: "warning",
            mensagem: "Email ou senha incorretos"
        }

    } catch (error) {
        return {
            tipo: "error",
            mensagem: `Error: ${error.message}`
        }
    }
}

export {
    buscar,
    criar,
    editar,
    deletar,
    logar
}