

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
  
  
  displayGoogleTranslate: function() {
    var request = new XMLHttpRequest();

    request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);

    request.onload = function() {
      // Begin accessing JSON data here
      var data = JSON.parse(this.response)

      if (request.status >= 200 && request.status < 400) {
        data.forEach(movie => {
          console.log(movie.title)
        })
      } else {
        console.log('error')
      };
    };

    // Send request
    request.send();
  },
  
  
  // Flip flashcard when the user presses the flashcard.
  displayFlashcard: function(flashcardNumber){
    console.log("FLIPPED: ", this.isFlipped);
    
    // Notify the user that they have no flashcards.
    if(flashcardList.flashcards === undefined || flashcardList.flashcards.length == 0){
      window.alert("You have no flashcards!");
      return;
    }
    
    if(this.isFlipped){
      document.getElementById("flashcardDisplayArea").innerHTML = flashcardList.flashcards[flashcardNumber].fcTextTranslated;
      document.getElementById("displayFlashcard").style.backgroundColor = "lightgreen";
    } else {
      //this.displayFlashcards(currentFlashcard);
      document.getElementById("flashcardDisplayArea").innerHTML = flashcardList.flashcards[flashcardNumber].fcTextQuestion;
      document.getElementById("displayFlashcard").style.backgroundColor = "white";
    }
    
  },
  
  
  
  displayFlashcardList: function(){
    var tbody = document.getElementById("flashCardListTable");
    
    tbody.innerHTML = '';
    
    //var newTbody = document.createElement('tbody');
    //tbody.parentNode.replaceChild(newTbody, tbody);
    
    flashcardList.flashcards.forEach(function(flashcard, position){

      // Create an empty <tr> element and add it to the 1st position of the tbody:
      var row = tbody.insertRow(position);
    
      // Insert new cells (<td> elements) of the "new" <tr> element:
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      //var cell4 = row.insertCell(3);
    
      // Add some text to the new cells:
      cell1.innerHTML = (position + 1).toString();
      cell2.innerHTML = flashcardList.flashcards[position].fcTextQuestion;
      cell3.innerHTML = flashcardList.flashcards[position].fcTextTranslated;
      //cell4.appendChild
      
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
    var flipFlashcardButton = document.getElementById("clickableFlashcardDisplay");
    var accessGoogleTranslate = document.getElementById("accessGoogleTranslateButton");
    
  
    flipFlashcardButton.addEventListener("click", function(){
      handlers.isFlipped = !handlers.isFlipped;  
      handlers.displayFlashcard(currentFlashcard);
    });
  
    // When the user clicks on the button, open the modal
    modalButton.onclick = function() {
      modal.style.display = "block";
      handlers.displayFlashcardList();
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

    // The conditional here checks that the button exists on the DOM.
    if(displayFlashcardsButton){
      console.log("display button pressed");  
      displayFlashcardsButton.addEventListener("click", function() {
        handlers.isFlipped = false;
        handlers.displayFlashcard(currentFlashcard);
      });
    }
    
    accessGoogleTranslate.addEventListener("click", function() {
      handlers.displayGoogleTranslate();
    });
    
    nextFlashcardButton.addEventListener("click", function() {
      currentFlashcard++;
      handlers.isFlipped = false;
      if(currentFlashcard === flashcardList.flashcards.length){
        currentFlashcard = 0;
        //currentFlashcard = flashcardList.flashcards.length - 1; 
        handlers.displayFlashcard(currentFlashcard);
      } else {
        handlers.displayFlashcard(currentFlashcard);
      }
      
    });
    
    previousFlashcardButton.addEventListener("click", function() {
      currentFlashcard--;
      handlers.isFlipped = false;
      if(currentFlashcard < 0){
        currentFlashcard = flashcardList.flashcards.length - 1; 
        handlers.displayFlashcard(currentFlashcard);
      } else {
        handlers.displayFlashcard(currentFlashcard);
      }
    });
  },
  
  createCheckbox: function(){
		var checkboxInput = document.createElement('input');
    checkboxInput.setAttribute("type", "checkbox");
    checkboxInput.className = 'checkboxInput';
    return checkboxInput;
	},
  
};


view.setUpEventListeners();








