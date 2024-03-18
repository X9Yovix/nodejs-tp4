const swaggerJSDoc = require("swagger-jsdoc")

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "TP4 API",
        version: "1.0.0",
        description: "api for lab4"
    },
    servers: [
        {
            url: "http://localhost:4000/api"
        }
    ]
}

const options = {
    swaggerDefinition,
    apis: ["./api/routes/*.js"]
}

const swaggerSpec = swaggerJSDoc(options)
module.exports = swaggerSpec