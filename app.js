// Copyright 2017 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/proxy') {
    http.get('http://www.example.com/', (outRes) => {
      outRes.on('data', (chunk) => {res.write(chunk);});
      outRes.on('close', () => {res.end();});
    });
  } else {
    res.statusCode = 404;
    res.end('404: Not Found');
  }
});

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
