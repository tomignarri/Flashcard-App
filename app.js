var express = require("express");
var app = express();

app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");


var flashcards = [

];


app.get('/', (req, res) => res.render("home"))

app.listen(3000, () => console.log("Flashcard app is listening"));