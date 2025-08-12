const http = require('http');
const fs = require('fs');
const myServer = http.createServer((req, res) => {
    // res.writeHead(200, {'Content-Type': 'text/plain'});
    fs.appendFile('log.txt' , `Request recieve from ${req.url} at ${new Date()} \n` , (err, data) => {
       res.end('Hello, World!');
    });
})

myServer.listen(3000, ()=>{
    console.log('Server is running on port 3000');
    
})