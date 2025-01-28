const prisma = require('./prisma/prismaClient')

const express= require('express')

const AuthController = require('./controllers/AuthControllers');

const cors = require('cors');
const app = express()
    
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const authRoutes = require('./routes/authRoutes')
app.use('/auth', authRoutes)

const reservaRoutes = require("./routes/reservaRoutes");
app.use("/reservas", AuthController.VerificaAutenticacao, reservaRoutes);

const tableRoutes = require('./routes/tableRoutes')   
app.use('/mesa', tableRoutes)


const admRoutes = require('./routes/admRoutes');
app.use('/perfil', AuthController.VerificaAutenticacao, admRoutes);

app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000");    
});

//npx prisma generate