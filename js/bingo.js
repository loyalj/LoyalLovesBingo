function Bingo() {
    this.uncalledNumbers = [];
    this.calledNumbers = [];
    this.lastCalledNumber = null;
    this.lastCalledLetter = null;

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