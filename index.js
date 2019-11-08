const axios = require('axios');
const querystring = require('querystring');
const url = require('url');

const http = require('http');
const hostname = '127.0.0.1'; const port = 3000;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    let UrlParse = url.parse(req.url);
    let query = querystring.parse(UrlParse.query);
    let path = UrlParse.pathname;
    let Site = 'http://api.github.com/repos/' + query.repo;

    axios.get(Site)
        .then(function (response) {
            let fs = response.data.stargazers_count;
            let fs2 = response.data.open_issues_count;
            res.end('Repo : ' + query.repo + 
            '\nstargazers_count : '+ fs
             + '\nopen_issues_count : ' + fs2);
        })
        .catch(function (error) {
            if (path != '/') {
                res.end('Page Not Found!');
            }
            if (!query.repo) {
                res.end('Invalid Query!');
            }
            else {
                res.end('Repository not found!');
            }


        });

});




server.listen(port, hostname, () => { console.log(`Server running at http://${hostname}:${port}/`); });