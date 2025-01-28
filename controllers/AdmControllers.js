const prisma = require('../prisma/prismaClient');

class AdmController {

  
  static async getAdm(req, res) {
    const perfil = await prisma.usuario.findUnique({
      where: { id: req.usuarioId },
      omit: { password: true },
    });

    return res.status(200).json({
      erro: false,
      mensagem: "Mostrando perfil do usuário",
      usuario: perfil,
    })
  }

  static async updateAdm(req, res) {
    const { nome, email } = req.body;

        const existe = await prisma.usuario.count({
            where: {
                email: email,
            }
        })

        if (existe != 0) {
            return res.status(422).json({
                erro: true,
                mensagem: "Email inválido",
            });
        }

        try {
            prisma.usuario.update({
                where: {
                    id: req.usuarioId
                },
                data: {
                    email: email,
                    nome: nome,
                }
            })

            return res.status(201).json({
                erro: false,
                mensagem: "Usuario atualizado",
            });

        } catch (error) {
          return res.status(500).json({
            erro: true,
            mensagem: "Erro ao cadastrar o usuário, tente novamente" + error,
        });
        }
  }

  static async buscarUsers(req, res) {
    try {
        const buscar = await prisma.usuario.findMany({
            omit: { password: true },
        });

        return res.status(200).json({
            erro: false,
            mensagem: "Usuarios buscados",
            usuarios: buscar,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            erro: true,
            mensagem: "Erro ao buscar usuarios",
        });
    }
}

}

module.exports = AdmController;