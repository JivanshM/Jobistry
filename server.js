const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'users.json');


function serveStaticFile(res, filePath, contentType) {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
}


const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/') {
            serveStaticFile(res, path.join(__dirname, 'index.html'), 'text/html');
        } else if (req.url === '/applications') {
          
            fs.readFile(DATA_FILE, (err, data) => {
                let applications = [];
                if (!err && data) {
                    try {
                        applications = JSON.parse(data);
                    } catch (err) {
                    
                        applications = [];
                    }
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(applications));
            });
