

// Overall list of flashcards.
var flashcardList = {
  
  
  flashcards: [],
  
  // Adds a flashcard object to Flashcard array.
  addFlashcard: function(fcTextQuestion, fcTextTranslated) {
    this.flashcards.push({
      fcTextQuestion: fcTextQuestion,
      fcTextTranslated: fcTextTranslated
    });
  },
  
  
};



var currentFlashcard = 0;

// Handle button functionality.
var handlers = {
  
  
  // Recieves Input.
  addFlashcard: function() {
    var addFlashcardQuestionInput = document.getElementById('addFlashcardQuestionInput');
    var addFlashcardTranslationInput = document.getElementById('addFlashcardTranslationInput');

    // Invoke addFlashcard function from flashcardList object.
    flashcardList.addFlashcard(addFlashcardQuestionInput.value, addFlashcardTranslationInput.value);
    
    // CLear the input fields.
    addFlashcardQuestionInput.value = '';
    addFlashcardTranslationInput.value = '';
    
    console.dir(flashcardList.flashcards);
  },
  
  // Display first flashcard in list.
  displayFlashcards: function(flashcardNumber){
    
    // if flashcardNumber is greater or less than range switch to range
    document.getElementById("displayFlashcard").innerHTML = flashcardList.flashcards[flashcardNumber].fcTextQuestion;
  },
};




// Other functions...spot to add event listeners later
var view = {
  
  // Recieve events from clicks and run functions from handlers.
  setUpEventListeners: function(){
    console.log("setUp ran"); 
    
    // Variables representing button objects on the DOM.
    var displayFlashcardsButton = document.getElementById("displayFlashcards");
    var nextFlashcardButton = document.getElementById("nextFlashcard");
    var previousFlashcardButton = document.getElementById("previousFlashcard");
    
    // The conditional here checks that the button exosts on the DOM.
    if(displayFlashcardsButton){
      console.log("display button pressed");  
      displayFlashcardsButton.addEventListener("click", function() {
        handlers.displayFlashcards(currentFlashcard);
      });
    }
    
    nextFlashcardButton.addEventListener("click", function() {
      currentFlashcard++;
      handlers.displayFlashcards(currentFlashcard);
    });
    
    previousFlashcardButton.addEventListener("click", function() {
      currentFlashcard--;
      handlers.displayFlashcards(currentFlashcard);
    });
    
 
    
  }
  
};


view.setUpEventListeners();




/*
TODO LIST

- show list of all flashcards
- allow deletion of flashcards
*/


