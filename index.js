import express from 'express'
import { config } from 'dotenv'
config()

import mascotasRoutes from './routes/mascota.routes.js'

const PORT = process.env.PORT  ||  3005;

const app = express()
app.use(express.json())

app.use("/api/mascota", mascotasRoutes)

app.listen(PORT, ()=> {
    console.log(" 😁 Server is running on http://localhost :" + PORT)
})