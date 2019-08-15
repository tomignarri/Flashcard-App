

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
  
  isFlipped: false,
  
  // Recieves Input.
  addFlashcard: function() {
    var addFlashcardQuestionInput = document.getElementById('addFlashcardQuestionInput');
    var addFlashcardTranslationInput = document.getElementById('addFlashcardTranslationInput');
    
    // Trim any values entered to avoid entering spaces and for user QOF.
    addFlashcardQuestionInput.value.trim();
    addFlashcardTranslationInput.value.trim();
    
    // This only runs the rest of the function if the forms have content.
    if(addFlashcardQuestionInput.value || addFlashcardTranslationInput.value){
    // Invoke addFlashcard function from flashcardList object.
    flashcardList.addFlashcard(addFlashcardQuestionInput.value, addFlashcardTranslationInput.value);
    
    // CLear the input fields.
    addFlashcardQuestionInput.value = '';
    addFlashcardTranslationInput.value = '';
    
    console.dir(flashcardList.flashcards);

    }  
  },
  
  // Display first flashcard in list.
  displayFlashcards: function(flashcardNumber){
    
    // Flip flashcard to question side .
    this.isFlipped = false;
    
    // Notify the user that they have no flashcards.
    if(flashcardList.flashcards === undefined || flashcardList.flashcards.length == 0){
      window.alert("You have no flashcards!");
      return;
    }
    
    // if flashcardNumber is greater or less than range switch to range
    document.getElementById("displayFlashcard").innerHTML = flashcardList.flashcards[flashcardNumber].fcTextQuestion;
  },
  
  // Flip flashcard when the user presses the flashcard.
  flipFlashcard: function(){
    
    if(this.isFlipped === false){
      document.getElementById("displayFlashcard").innerHTML = flashcardList.flashcards[currentFlashcard].fcTextTranslated;
      //document.getElementById("flashcardContainer").style.backgroundColor = "lightgreen";
    } else {
      this.displayFlashcards(currentFlashcard);
      //document.getElementById("flashcardContainer").style.backgroundColor = "white";
    }
    this.isFlipped = !this.flipped;
  }
  
  
  
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
      if(currentFlashcard === flashcardList.flashcards.length){
        currentFlashcard = 0;
        //currentFlashcard = flashcardList.flashcards.length - 1; 
        handlers.displayFlashcards(currentFlashcard);
      } else {
        handlers.displayFlashcards(currentFlashcard);
      }
      
    });
    
    previousFlashcardButton.addEventListener("click", function() {
      currentFlashcard--;
      if(currentFlashcard < 0){
        currentFlashcard = flashcardList.flashcards.length - 1; 
        handlers.displayFlashcards(currentFlashcard);
      } else {
        handlers.displayFlashcards(currentFlashcard);
      }
    });
    
 
    
  }
  
};


view.setUpEventListeners();


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
