const express = require('express');
const app = express();
require('dotenv').config();
// require('express-async-errors');

const AuthRoute = require('./routes/Auth');
const ListRouter = require('./routes/Categories');
const TodoRouter = require('./routes/Tasks');
const connectDb = require('./db/connect');
const NotFound = require('./middleware/notFound');
const ErrorHandler = require('./middleware/errorhandler');
const AuthenticationHandler = require('./middleware/authentication');
const AccessControl = require('./middleware/access-control')

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// security packages
// const helmet = require('helmet')
// const cors = require('cors')
// const xss = require('xss-clean');
// const rateLimiter = require('express-rate-limit');

// app.set('trust proxy', 1)
// const Limiter = rateLimiter({
// 	windowMs: 15 * 60 * 1000, // 15 minutes
// 	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
// })

// app.use(Limiter())

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get('/', (req, res)=>{
    res.send('<h1>TodoList API</h1><a href="?api/v1/todos">tasks route<a>').status(200)
    console.log('Yes')
})

// const swaggerOptions = {
//   definition: {
//     openapi: '3.0.0', // OpenAPI version (required)
//     info: {
//       title: 'To-do List API', // API title (required)
//       version: '1.0.0', // API version (required)
//       description: 'Your API description',
//     },
//     contact: {
//       name: "LogRocket",
//       url: "https://logrocket.com",
//       email: "info@email.com",
//     },
//     servers: [
//       {
//         url: "http://localhost:3000/api/v1",
//       },
//     ],
//   },
//   apis: ['./routes/*.js'], // Location of API route files
// };

// const swaggerSpec = swaggerJsdoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/v1/auth', AuthRoute);
app.use('/api/v1/categories', AuthenticationHandler, ListRouter);
app.use('/api/v1/tasks',AuthenticationHandler, TodoRouter)

app.use(AccessControl)
app.use(NotFound)
app.use(ErrorHandler)

  

const port = process.env.PORT || 3000


const start = async ()=>{
    try{
        await connectDb(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log(`Listening on port ${port}`)
        })
    }
    catch(error){
        console.log(error)
    }
}
start()