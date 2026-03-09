import jwt from "jsonwebtoken";

function rotaProtegida(req, res, next){
    let headers = req.headers.authorization;

    if(!headers){
        res.json({
            tipo: "warning",
            mensagem: "Token é necessário"
        })
    }
    
    let token = headers.split(" ")[1];
    
    jwt.verify(token, process.env.SEGREDO, (error) => {
        if(error){
            if(error.message == "jwt expired") {
                res.json({
                    tipo: "warning",
                    mensagem: `Token expirado`
                })
            }
            res.json({
                tipo: "error",
                mensagem: `Erro: Token inválido`
            })
        }

        next()
    })

}

export {
    rotaProtegida
}