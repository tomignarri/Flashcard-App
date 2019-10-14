var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");


var flashcards = [

];



app.get('/', (req, res) => res.render("home"));


// Post to an input action
app.post("/newFlashcard", function(req, res) {
    var question = req.body.question;
    var translation = req.body.translation;
    var newFlashcard = {question: question, translation: translation};
    flashcards.push(newFlashcard);
    res.redirect("/");
    console.log(flashcards);
});


app.listen(3000, () => console.log("Flashcard app is listening"));