const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:
hbs.registerPartials(path.join(__dirname, '/views/partials'));
// /sdf
// add the routes here:
app.get('/', (req, res) => res.render('index'));
app.get('/beers', (req, res) => {
    punkAPI
    .getBeers ()
    .then (beersFromApi => {console.log(beersFromApi); res.render('beers', {beersFromApi})})
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
    punkAPI
        .getBeers()
        .then(beersFromApi => res.render('randomBeer',beersFromApi[Math.floor(Math.random()*beersFromApi.length)]))
        .catch(error => console.log(error));
});

app.get('/beers/:id', (req,res) => {
    const id = req.params.id;
    punkAPI
        .getBeer(id)
        .then(beer=> {
            console.log(beer[0]);

        })
        .catch()
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
