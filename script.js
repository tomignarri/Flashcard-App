


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








// Handle button functionality.
var handlers = {
  
  // Recieves Input.
  addFlashcard: function() {
    var addFlashcardQuestionInput = document.getElementById('addFlashcardQuestionInput');
    var addFlashcardTranslationInput = document.getElementById('addFlashcardTranslationInput');

    // Invoke addFlashcard function from flashcardList object.
    flashcardList.addFlashcard(addFlashcardQuestionInput.value, addFlashcardTranslationInput.value);
    console.dir(flashcardList.flashcards);
  },
  
  // Display first flashcard in list.
  displayFlashcards: function(){
    document.getElementById("displayFlashcard").innerHTML = flashcardList.flashcards.fcTextQuestion;
  },
  
  nextFlashcard: function(){
    
  },
  previousFlashcard: function(){
    
  }
  
};



// Other functions
var view = {
  
};



