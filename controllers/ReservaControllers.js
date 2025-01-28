const prisma = require('../prisma/prismaClient');

class ReservaController {

    static async cancelReserva(req, res) {
        const reservaId = req.body.reservaId;
    
        if (!reservaId) {
            return res.status(401).json({
                erro: true,
                mensagem: "Não tem nenhuma reserva pra cancelar",
            })
        }

        try {
          const cancel =  await prisma.reserva.delete({
            where: {
                id: reservaId,
            }
          })

          console.log(JSON.stringify(cancel));
    
          return res.status(200).json({
            erro: false,
            mensagem: "Reserva cancelada com sucesso.",
          });
        } catch (error) {
          return res.status(500).json({
            erro: true,
            mensagem: "Erro ao cancelar a reserva." + error,
          });
        }
      }

      static async registerReserva(req, res) {
        const { mesaId, n_pessoas } = req.body;
        const data = new Date(req.body.data)

        const mesa = await prisma.mesa.findUnique({
            where: { id: mesaId },
            include: {
                reservas: {
                    where: {
                        data: data,
                        status: true,
                    }
                }
            }
        })

        if (mesa.reservas.length > 0) {
            return res.status(400).json({
                erro: true,
                mensagem: "Mesa ja reservada para esta data",
            });
        }

        if (data < Date()) {
            return res.status(400).json({
                erro: true,
                mensagem: "Data inferior ao dia atual."
            });
        }

        if (mesa.n_lugares < n_pessoas) {
            return res.status(422).json({
                erro: true,
                mensagem: "O número de pessoas maior que a capacidade da mesa."
            });
        }

        prisma.reserva.create({
            data: {
                data: data,
                n_pessoas: n_pessoas,
                usuario: {
                    connect: {
                        id: req.usuarioId,
                    },
                },
                mesa: {
                    connect: {
                        id: mesaId,
                    },
                },
            },
        }).then(() => {
            return res.status(200).json({
                erro: false,
                mensagem: "Reserva realizada com sucesso",
            })
        })
            .catch((error) => {
                return res.status(201).json({
                    erro: true,
                    mensagem: "Ocorreu um erro ao cadastrar reserva." + error,
                })
            });
    }

    static async getReserva(req, res) {
        try {
            const quantReservas = await prisma.reserva.findMany({
                where: {
                    usuarioId: req.usuarioId, // Filtra diretamente pelo ID do usuário
                },
                include: {
                    mesa: true, // Inclui os dados da mesa associada à reserva
                },
            });

            if (quantReservas.length == 0) {
                return res.status(222).json({
                    erro: true,
                    mensagem: "O usuario não possui nenhuma reserva.",
                })
            }


            return res.status(200).json({
                erro: false,
                mensagem: "Reservas visualizadas com sucesso!",
                reservas: quantReservas,
            });
        } catch (error) {
            return res.status(500).json({
                erro: true,
                mensagem: "Ocorreu um erro, tente novamente" + error,
            });
        }
    }

    static async buscarReservaDate(req, res) {
        const data = new Date(req.body.data);

        try {
            const reservasDate = await prisma.reserva.findMany({
                where: {
                    data: data
                },
                include: {
                    usuario: true,
                    mesa: true
                }
            })

            if (reservasDate.length == 0) {
                return res.status(222).json({
                    erro: true,
                    mensagem: "Não existe reserva nesta data.",
                });
            }

            return res.status(201).json({
                erro: false,
                mensagem: "Busca de reserva por data realizada com sucesso",
                reservas: reservasDate,
            });

        } catch (error) {
            return res.status(500).json({
                erro: true,
                mensagem: "Ocorreu um erro, tente novamente" + error,
            });
        }
    }

}

module.exports = ReservaController;