
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcryptjs = require("bcryptjs");

class AuthController{

    static async cadastro(req, res){
        const { nome, email, password, tipo } = req.body;

        if(!nome || nome.length < 6){
            return res.json({
                erro: true,
                mensagem: "Seu nome há de ter 6 caracteres minimamente.",
            });
        }
        
        if(!email || email.length < 10){
            return res.json({
                erro: true,
                mensagem: "Seu e-mail há de ter 10 caracteres minimamente.",
            });
        }

        if(!password || password.length < 8){
            return res.json({
                erro: true,
                mensagem: "Sua senha há de ter 8 caracteres minimamente.",
            });
        }

        const existe = await prisma.usuario.count({
            where: {
                email: email,
            }
        })

        if (existe != 0) {
            return res.json({
                erro: true,
                mensagem: "Este e-mail já está sendo usado, se precisar trocar de senha contate o seu gmail e recupere-a.",
            });
        }

        const salt = bcryptjs.genSaltSync(8);
        const hashPassword = bcryptjs.hashSync(password, salt);

        try {
            const usuario = await prisma.usuario.create({
                data: {
                    nome: nome,
                    email: email,
                    password: hashPassword,
                    tipo: "cliente",
                }
            });

            return res.json({
                erro: false,
                mensagem: "Cadastro efetuado com sucesso!"
            });

        } catch (error) {
            return res.json({
                erro: true,
                mensagem: "Algo deu errado, por favor tente novamente!" + error,
            });
        }
    // TESTING
    }
    static async login(req, res){   
    }
}
module.exports = AuthController;