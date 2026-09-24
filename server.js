import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, 'public');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  let file = url.pathname === '/' ? '/index.html' : url.pathname;
  const safePath = path.normalize(path.join(publicDir, file));
  if (!safePath.startsWith(publicDir)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.readFile(safePath, (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'});
      res.end('Not found'); return;
    }
    const ext = path.extname(safePath);
    const types = {
      '.html':'text/html; charset=utf-8',
      '.css':'text/css; charset=utf-8',
      '.js':'application/javascript; charset=utf-8',
      '.json':'application/json; charset=utf-8',
      '.svg':'image/svg+xml'
    };
    res.writeHead(200, {'Content-Type': types[ext] || 'application/octet-stream'});
    res.end(data);
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`T3allem server running on port ${port}`);
});
