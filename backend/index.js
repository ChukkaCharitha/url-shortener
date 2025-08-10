const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

let urls = {};

// POST - create short URL
app.post('/shorten', (req, res) => {
    const { longUrl } = req.body;
    const shortId = Math.random().toString(36).substr(2, 6);
    urls[shortId] = longUrl;
    res.json({ shortCode: shortId }); // match frontend
});

// GET - redirect short URL
app.get('/:shortId', (req, res) => {
    const shortId = req.params.shortId;
    const longUrl = urls[shortId];
    if (longUrl) {
        res.redirect(longUrl);
    } else {
        res.status(404).send('URL not found');
    }
});

app.listen(5000, () => {
    console.log('Backend running on http://localhost:5000');
});
