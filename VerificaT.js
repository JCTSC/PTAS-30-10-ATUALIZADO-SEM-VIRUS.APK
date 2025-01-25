const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fetchAllData() {
  try {
    const data = await prisma.table.findMany({
      include: {
        user: true,
      },
    });

    console.log(data);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

fetchAllData();