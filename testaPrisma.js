const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    const usuario = await prisma.usuario.create({
        data: {
            nome: "BBC",
            email: "bbc@example.com",
            password: "senha123",
            tipo: "cliente",
        },
    });

    console.log("Novo Usuário: " + JSON.stringify(usuario));

    const usuarios = await prisma.usuario.findMany();
    console.log("Todos os usuários: " + JSON.stringify(usuarios));
    console.log(usuario);

}

main();