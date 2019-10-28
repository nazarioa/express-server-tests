const express = require('express');
const fs = require('fs')
const url = require('url');
const cors = require('cors');
const errorlog = require('express-errorlog');


const app = express();

app.use(cors());
app.use('/public', express.static(__dirname + '/public'));
app.use(express.static( `${__dirname}/public`));
app.use(errorlog);

app.use((err, req, res, next) => {
    console.log(err);
});

app.get('/fruit', (request, response) => {
    response.json(['Apple', 'Banana', 'Cherry', 'Dragon fruit']);
});

app.post('/save-data', (request, response) => {
    let body = '';
    const filePath = `${__dirname}/public/data.txt`;

    request.on('data', (data) => {
        body += `
${new Date().toISOString()}
------------------------
${data}

====
`;
    });

    request.on('end', () => {
        console.log(body);
        response.end();
    });

});

app.listen(3000, () => {
    console.log('Server running on port 3000');
    console.log('Watch here to see post requests');
});
