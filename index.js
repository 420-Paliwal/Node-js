const express = require('express');
const port = 3000
const userRouter = require('./routes/user')
const { mongoDbConnection} = require('./connection')
const { logreq } = require('./middlewares')
const app = express();

mongoDbConnection('mongodb://127.0.0.1:27017/youtube-app-1')

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.use(logreq('server.txt'))
app.use('/user', userRouter)
 
app.get('/', (req, res) =>{
    res.send('hello world');
})

app.listen(port, (err, data) => {
    console.log("app is listening on the port :", port)
}) 