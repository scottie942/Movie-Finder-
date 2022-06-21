const express = require('express');
const axios = require("axios");
const morgan = require("morgan");
const app = express();

require("dotenv").config();

app.use(morgan("dev"));

const APIkey = process.env.API_KEY;

let arr = [];

app.get("/", (req, res) => {
    let key = Object.keys(req.query).toString();
    let searchBy = key == "i" ? "imdbID" : "Title";
    let found = arr.find(movie => movie[searchBy].toLowerCase() == req.query[key]);
    if (found == undefined){
        axios.get(`http://www.omdbapi.com${req.url}&apikey=${APIkey}`)
        .then((movie) => {
            res.send(movie.data);
            arr.push(movie.data);
        })
        .catch((err) => {
            console.log(err);
        })
    } else {
        res.send(found);
    }       
}) 

module.exports = app;