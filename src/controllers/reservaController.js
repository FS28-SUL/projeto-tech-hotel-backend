import { PRISMA } from "../services/index.js"

async function buscar() {
    try {
        return await PRISMA.reserva.findMany({
            orderBy: {
                id: "asc"
            },
            include: {
                cliente: true,
                quarto: true,
                pagamento: true
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
        const request = await PRISMA.reserva.create({
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
        const request = await PRISMA.reserva.update({
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
        const request = await PRISMA.reserva.delete({
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

export {
    buscar,
    criar,
    editar,
    deletar
}