const prisma = require('../prisma/prismaClient');
const bcryptjs = require('bcryptjs');

class TableController {

    static async createTable(req, res) {
        const { codigo, n_lugares } = req.body;

            const existe = await prisma.mesa.count({
                where: { codigo: codigo, }
            });

            if (existe != 0) {
                return res.status(422).json({
                    erro: true,
                    mensagem: "Codigo já cadastrado"
                });
            }

        try {            
            const createMesa = await prisma.mesa.create({
                data: {
                    codigo: codigo,
                    n_lugares: n_lugares,
                }
            });

            console.log(JSON.stringify(createMesa));

            return res.status(201).json({
                erro: false,
                mensagem: "mesa foi cadastrada",
            })

        } catch (error) {
            return res.status(500).json({ erro: true, mensagem: "Erro ao criar grade de mesas.", error });
        }
    }

    static async buscarTable(req, res) {
        const mesas = await prisma.mesa.findMany();

        return res.status(200).json({
            erro: false,
            mensagem: "mesas encontradas com sucesso",
            mesas: mesas,
        });
    }

    static async buscarTablesDate(req, res) {
        const data = new Date(req.body.data);
    
        try {
            const mesasDate = await prisma.mesa.findMany({
                where: {
                    reservas: {
                        some: {
                            data: {
                                equals: data, // Verifica se existe alguma reserva na data especificada
                            },
                        },
                    },
                },
                include: {
                    reservas: {
                        where: {
                            data: {
                                equals: data, // Inclui apenas reservas na data especificada
                            },
                        },
                    },
                },
            });
    
            if (mesasDate.length === 0) {
                return res.status(222).json({
                    erro: true,
                    mensagem: "não existe mesa reservada para esta data.",
                });
            }
    
            return res.status(200).json({
                erro: false,
                mensagem: `Busca de mesas por data realizada com sucesso!`,
                reservas: mesasDate,
            });
    
        } catch (error) {
            return res.status(500).json({
                erro: true,
                mensagem: "Ocorreu um erro, tente novamente mais tarde! " + error.message,
            });
        }
    }


}

module.exports = TableController;