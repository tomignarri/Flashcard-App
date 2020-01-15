var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");

// Fix mongoose deprecations
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// Connect to database.
var url = "mongodb+srv://tomi:466JCC2U7OWDMO9d@cluster0-ainnu.mongodb.net/fatest?retryWrites=true&w=majority";
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
// Set 'views' directory for any views 
// being rendered res.render()
app.set("view engine", "ejs");

// Override HTTP verbs if necessary.
app.use(methodOverride("_method"));



var flashcardSchema = new mongoose.Schema ({
    question: String,
    translation: String
});

//creates model with above schema and has methods such as .find etc.
var Flashcard = mongoose.model("Flashcard", flashcardSchema); 

app.get('/', (req, res) => {
  Flashcard.find({}, function(err, allFlashcards){
    if(err){
      console.log(err);
    } else {
      res.render("home", {flashcardsDB: allFlashcards});
    }
  }); 
});

// Post to an input action
app.post("/flashcards", function(req, res) {
    var question = req.body.question;
    var translation = req.body.translation;
    var newFlashcard = {question: question, translation: translation};
    console.log(newFlashcard);
    Flashcard.create(newFlashcard, function(err, newlyCreated){
        if(err){
	        console.log(err);
	    } else {
			res.redirect("/");
		}
    });
});

// Show info.
app.get("/info",function (req, res) {
    res.render("info");
});

// Show all flashcards
app.get("/flashcards", function(req, res){
    Flashcard.find({}, function(err, allFlashcards){
      if(err){
        console.log(err);
      } else {
        res.render("flashcards", {flashcards: allFlashcards});
      }
    }); 
});

// Show form to create new campground
app.get("/new", function(req, res){
  res.render("new");  
});

// Edit flashcard
app.get("/", function(req, res){
  
});

// Update flashcard
app.put("/", function(req, res){
  
});

// Destroy Flashcard
app.delete("/flashcards/:id", function(req, res){
    Flashcard.findByIdAndRemove(req.params.id, function(req, res){
      if(err){
		    res.redirect("back");
		  } else {
        //req.flash("success", "flashcard deleted.");
		    res.redirect("flashcards");
		  }
    });
});




app.listen(3000, () => console.log("Flashcard app is listening"));