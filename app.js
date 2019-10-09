var express = require("express");
var app = express();

app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");


var flashcards = [

];


// Post to an input action
app.post("/newFlashcard", function(req, res){
    var question = req.body.question;
    var translation = req.body.translation;
    var newFlashcard = {question: question, translation: translation};
    flashcards.push(newFlashcard);
});


app.get('/', (req, res) => res.render("home"));

app.listen(3000, () => console.log("Flashcard app is listening"));