// import http from "http";
const http = require("http");
const currenciesJSON = require("./currencies.json");

const server = http.createServer((req, res) => {
    // const date = new Date().toLocaleDateString();
    // const time = new Date().toLocaleTimeString();
    // res.write(`Current date/time of the server: ${date} ${time}`)
    // const serverInfo = {
    //     serverName: "Crio Server",
    //     version: "1.0.0",
    //     currentDate: new Date().toDateString(),
    //     currentTime: new Date().toTimeString(),
    // };      
    switch (req.url) {
        case "/": {
            res.writeHead(200, { "Content-Type": "text/html"});
            res.write(`<h1>Currency Database</h1>`)
            res.end();
            break;
        }
        case "/currencies": {
            res.writeHead(200, { "Content-Type": "application/json"});
            res.write(JSON.stringify(currenciesJSON))
            res.end();
            break;
        }
        default: {
            res.writeHead(404, { "Content-Type": "application/json"});
            res.write(JSON.stringify({ message: "Route doesn't exist" }))
            res.end();
        }
    }
})

const PORT = 8082;

server.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`)
})