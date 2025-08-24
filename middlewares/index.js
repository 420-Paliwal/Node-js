const fs = require('fs')

function logreq(filename) {
    return ((req, res, next ) => {
            const log = ` ${new Date().toString()}. // ${req.method} // ${req.url} // ${req.ip} \n`
    fs.appendFile(filename, log, (err)=> {
        if (err) {
            console.error('Error writing to log file', err);
        }
        })
        next()
    })
}

module.exports = {
    logreq,
}