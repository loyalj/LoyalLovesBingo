function Bingo() {
    this.uncalledNumbers = [];
    this.calledNumbers = [];
    this.lastCalledNumber = null;
    this.lastCalledLetter = null;
    this.cards = [];
   

    this.winningGame = [
        1, 1, 1, 1, 1, 
        1, 1, 1, 1, 1, 
        1, 1, 1, 1, 1, 
        1, 1, 1, 1, 1, 
        1, 1, 1, 1, 1
    ];

    /*this.winningGame = [
        1, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 
        0, 0, 1, 0, 0, 
        0, 0, 0, 0, 0,     
        1, 0, 0, 0, 1
    ];*/

    this.numbers = {
        'b': [ 1, 15],
        'i': [16, 30],
        'n': [31, 45],
        'g': [46, 60],
        'o': [61, 75]
    };
}


Bingo.prototype.reset = function() {

    this.uncalledNumbers = [];
    this.calledNumbers = [];
    this.lastCalledNumber = null;
    this.cards = [];

    for(i = 1; i <= 75; i++) {
        this.uncalledNumbers.push(i);
    }

};

Bingo.prototype.shuffle = function() {
    // Shuffle algorithm found here 
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    var currentIndex = this.uncalledNumbers.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = this.uncalledNumbers[currentIndex];
        this.uncalledNumbers[currentIndex] = this.uncalledNumbers[randomIndex];
        this.uncalledNumbers[randomIndex] = temporaryValue;
    }
};

Bingo.prototype.callNumber = function() {

    this.lastCalledNumber = this.uncalledNumbers.shift() 
    this.calledNumbers.push(this.lastCalledNumber);

    for (var letter in this.numbers) {
        if(this.lastCalledNumber <= this.numbers[letter][1]) {
            this.lastCalledLetter = letter;
            break;
        }
    }

    return this.lastCalledNumber;
};

Bingo.prototype.addCard = function() {
    var newCard = [];

    // Go through the letters
    for(i = 1; i <= 5; i++) {
        for (var letter in this.numbers) {
            
            // Check for the free space and insert a 0
            if(newCard.length == 12) {
                newCard.push(0);
                continue;    
            }

            // Otherwise generate a number from the current letter range
            var newNumber = Math.floor(Math.random() * (this.numbers[letter][1] - this.numbers[letter][0] + 1)) + this.numbers[letter][0];
            
            // Avoid duplicates
            while (newCard.indexOf(newNumber) > -1) {
                newNumber = Math.floor(Math.random() * (this.numbers[letter][1] - this.numbers[letter][0] + 1)) + this.numbers[letter][0];
            }


            newCard.push(newNumber);
        }
    }

    this.cards.push(newCard);
}


Bingo.prototype.checkBingos = function(){
    var bingoCount = 0;

    for (var card in this.cards) {
        var cardCheckArray = [];
        for (var number in bHall.cards[card]) {
            if((this.calledNumbers.indexOf(bHall.cards[card][number]) > -1) || (bHall.cards[card][number] == 0))  {
                cardCheckArray.push(1);
            }
            else {
                cardCheckArray.push(0);
            }
        }

        if(JSON.stringify(cardCheckArray)==JSON.stringify(this.winningGame)) {
            bingoCount++;
        }
    }

    return bingoCount;
}