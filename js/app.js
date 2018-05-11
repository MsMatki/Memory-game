
let symbolsArray = ['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb'];
symbolsArray = symbolsArray.concat(symbolsArray);

let deck = document.querySelector('.deck');
let restart = document.querySelector('.restart');
let movesOutput = document.querySelector('.moves');
let star = document.querySelectorAll('.fa-star');
let time = document.querySelector('.time');
let cardsMatch = [];
let cardsOppened = [];
let moves = 0;
let second = 0;
let output = '';
let score = 3;
let classes;
let cancel;
let clicks = 0;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//function creates a new game
function newGame(){
for(let i = 0; i < star.length; i += 1){
    star[i].classList.remove('fa-star-o');
    star[i].classList.add('fa-star');
}     
    cardsMatch = [];
    cardsOppened = [];
    moves = 0;
    movesOutput.innerHTML = moves;
    second = 0;
    stopTimer();
    time.innerHTML = second;
    startGame();
}

//starts the timer on first click
function startTimer() {
    clicks += 1;
    if(clicks === 1){
	cancel = setInterval(function () {
        second += 1
        time.innerHTML = second;
    }, 1000);
}
}
//stops the timer
function stopTimer(){
    clicks = 0;
    clearTimeout(cancel);
}
//moves counter
function countMoves(){
    moves += 1;
    movesOutput.innerHTML = moves;
}

//start game, displays empty cards on start
function startGame(){
    
    shuffle(symbolsArray);
    for(let i = 0; i < symbolsArray.length; i += 1){
        output += '<li class="card"><i class="fa '+symbolsArray[i]+'"></i></li>';
       }
       deck.innerHTML = output; 
       cardDisplay();
       output = ''; 
}

//Stars rating function 
 function starRating(){
    if(moves === 12){
        star[2].classList.remove('fa-star');
        star[2].classList.add('fa-star-o');
        score = 2;
    }else if(moves === 18){
        star[1].classList.remove('fa-star');
        star[1].classList.add('fa-star-o');
        score = 1;
    }else if(moves === 22){
        star[0].classList.remove('fa-star');
        star[0].classList.add('fa-star-o');
        score = 0;
    }
 }   
//function modal end game
 function endGame() {
	swal({
		closeOnEsc: false,
		closeOnClickOutside: false,
		title: 'Congratulations! You Won!',
		text: 'With ' + moves + ' Moves and ' + score + ' Stars in ' + second + ' Seconds.',
		icon: 'success',
		button: 'Play again!'
	}).then(function (isConfirm) {
		if (isConfirm) {
            newGame();
		}
	})
}
//restart game modal
function restartGame(){
    swal({
		closeOnEsc: false,
        closeOnClickOutside: false,
		title: 'Are you sure you want to restart the game?',
		text: 'All progress will be lost!',
        icon: 'warning',
        buttons: [true, 'Restart!'],
	}).then(function (isConfirm) {
		if (isConfirm) {
            newGame(); 
		}
	})
}

//function if both cards match
function bothCardsMatch(){
    classes = document.querySelectorAll('.open');
    for(let i = 0; i < classes.length; i += 1){
    classes[i].classList.remove('open', 'show', 'animated', 'flipInY');
    classes[i].classList.add('match', 'animated', 'rubberBand');
    }
    //resets the added array
    cardsMatch.push(cardsOppened[0], cardsOppened[1]);
    cardsOppened = [];
}

//if cards do not match, makes cards to red color and closes both cards
function cardsNotMatch(){
    classes = document.querySelectorAll('.open');
    for(let i = 0; i < classes.length; i += 1){
    classes[i].classList.remove('animated', 'flipInY');
    classes[i].classList.add('red', 'animated', 'tada');
     }
     //function closes both cards if they do not match
        function closeCards(){
           let card = document.querySelectorAll('.card');
           cardsMatch.slice(cardsOppened);
           cardsOppened = [];
           for(let i = 0; i < card.length; i += 1){
           card[i].classList.remove('open', 'show', 'red', 'animated','tada','flipInY');
       }     
     }
        //closes both cards on timeout
     setTimeout(closeCards, 600);
  }

//display cards and compare them
function cardDisplay(){
    movesOutput.innerHTML = moves;
    let card = document.querySelectorAll('.card');
    for(let i = 0; i < card.length; i += 1){
        //Card listener
    card[i].addEventListener('click', function(){
        if(card[i].classList.contains('show') || card[i].classList.contains('match')){
            return true;
        }
       startTimer();
     if(cardsOppened.length < 2){
         card[i].classList.add('open','show','animated','flipInY');
            //if added array is empty, pushes one card to array
         if(cardsOppened.length === 0){
             cardsOppened.push(symbolsArray[i]);
                 //if added array allready has another card, pushes the second card
            }else if(cardsOppened.length === 1){
                cardsOppened.push(symbolsArray[i]);
                countMoves();
                starRating(); 
                //if cards match, sets both cards to green 
            if(cardsOppened[0] === cardsOppened[1]){
                bothCardsMatch();
                //if all cards match game ends
             if(cardsMatch.length === symbolsArray.length){
                endGame();
                stopTimer()
                }
            }else{ 
               cardsNotMatch();       
                }
            }
        }
      },false)
    }
}
//onclick restart game
restart.addEventListener('click',function(){
   restartGame();
})
startGame();

