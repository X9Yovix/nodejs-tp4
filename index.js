const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const swaggerUI = require("swagger-ui-express")
const swaggerSpec = require("./configs/swagger")
const connectDB = require("./configs/db_config")

const port = process.env.PORT
const app = express()
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error)
        process.exit(1)
    })

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))
app.use(express.json())