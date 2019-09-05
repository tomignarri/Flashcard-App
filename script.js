

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
  },
  
  
  
  displayFlashcardList: function(){
    var table = document.getElementById("flashCardListTable");
    
    
    flashcardList.flashcards.forEach(function(flashcard, position){

      // Create an empty <tr> element and add it to the 1st position of the table:
      var row = table.insertRow(position);
    
      // Insert new cells (<td> elements) of the "new" <tr> element:
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
    
      // Add some text to the new cells:
      cell1.innerHTML = position.toString();
      cell2.innerHTML = "NEW CELL2";
      cell3.innerHTML = "NEW CELL2";
   
      
      
    });
    
  }
  
};




// Other functions...spot to add event listeners later
var view = {
  
  // Recieve events from clicks and run functions from handlers.
  setUpEventListeners: function(){
    console.log("setUp ran"); 
    
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var modalButton = document.getElementById("modalButton");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    
    // Variables representing button objects on the DOM.
    var displayFlashcardsButton = document.getElementById("displayFlashcards");
    var nextFlashcardButton = document.getElementById("nextFlashcard");
    var previousFlashcardButton = document.getElementById("previousFlashcard");
    
    // When the user clicks on the button, open the modal
    modalButton.onclick = function() {
      modal.style.display = "block";
      handlers.displayFlashcardList();
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
      handlers.displayFlashcardList
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    // The conditional here checks that the button exists on the DOM.
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








