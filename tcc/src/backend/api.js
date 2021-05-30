const express = require('express');
const routes = require('./nodeRoutes');
const app = express();

app.use(express.json()); //faz funcionar o request.body em JSON

app.use(routes);

app.get('/', (req, res) => {
    res.send('Funcionando!')
})

var listener = app.listen(3000, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});

const { networkInterfaces } = require('os');

// código para descobrir qual ip está sendo utilizado
const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }   
            results[name].push(net.address);
        }
    }
}

console.log(results);
