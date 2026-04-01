const http = require('http');
const https = require('https');

const FD_KEY = 'f2ba0dc33f2449d7a0d2a83c0e2f108c';

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  const path = req.url.replace('/fd', '');
  const opts = {
    hostname: 'api.football-data.org',
    path: '/v4' + path,
    headers: { 'X-Auth-Token': FD_KEY }
  };

  https.get(opts, apiRes => {
    let data = '';
    apiRes.on('data', c => data += c);
    apiRes.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
  }).on('error', e => {
    res.writeHead(500); res.end(JSON.stringify({ error: e.message }));
  });
});

server.listen(3333, () => console.log('Proxy running on http://localhost:3333'));


//hello123456Essel$