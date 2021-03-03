const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dao = require('./dao');
const { request } = require('https');
const { response } = require('express');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).sendFile('index.html', {
        root: path.resolve('../public')
    });
});

app.get('/admin', (req, res)  => {
    res.status(200).sendFile('admin.html', {
        root: path.resolve('../public')
    });
})

//this is not working
app.post('/insertRating', (request, response)  => {
    
    var ratee = request.query.ratee;
    var stars = request.query.stars;
    var comment = request.query.comment;
    
    insertRating(ratee, stars, comment);

    response.status(200).send( {});
})

app.post('/deleteRating', (request, response)  => {
    
    var ratee = request.query.ratee;
    var stars = request.query.stars;
    var comment = request.query.comment;
    
    deleteRating(ratee, stars, comment);

    response.status(200).send({});
})


app.get('/getRatings', async (request, response)  => {
    var resultsHTML = await dao.getResultsAsHtml();

    console.log("results: ", resultsHTML);
    
    response.status(200).send(resultsHTML );
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.post('/insertChoice', (request, response) => {

    console.log("Conneced to insertChoice");
    
    response.status(200).send("something");
})
