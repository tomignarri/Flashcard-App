var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Connect to database.
var url = process.env.DATABASEURL;
mongoose.connect(url, {
	useNewUrlParser: true,
	useCreateIndex: true,
}).then(() => {
	console.log("connected to mongoDB");
}).catch(err => {
	console.log("Error:", err.message);
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());


var flashcardSchema = new mongoose.Schema ({
    question: String,
    translation: String
});

//creates model with above schema and has methods such as .find etc.
var Flashcard = mongoose.model("Flashcard", flashcardSchema); 

app.get('/', (req, res) => res.render("home"));


// Post to an input action
app.post("/newFlashcard", function(req, res) {
    var question = req.body.question;
    var translation = req.body.translation;
    var newFlashcard = {question: question, translation: translation};
    Flashcard.create(newFlashcard, function(err, newlyCreated){
        if(err){
	        console.log(err);
	    } else {
			res.redirect("/");
		}
    });
});

// Edit flashcard





app.listen(3000, () => console.log("Flashcard app is listening"));