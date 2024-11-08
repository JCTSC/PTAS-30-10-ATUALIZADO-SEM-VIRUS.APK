const prisma = new PrismaClient();

const express = require("express");

const app = express();
app.use(express.json())

const authRouters = require("./routes/authRoutes");
app.use("/auth", authRouters);

app.listen(8000);

const cors = require(`cors`);