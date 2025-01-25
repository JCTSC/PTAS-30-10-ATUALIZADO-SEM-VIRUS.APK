const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fetchAllData() {
  try {
    const users = await prisma.user.findMany({
      include: {
        tables: true,
      },
    });

    console.log(users);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

fetchAllData();