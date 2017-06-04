function Bingo() {
    // Set up the ball bins. TODO, replace with index system?
    this.uncalledNumbers = [];
    this.calledNumbers = [];
    
    // Track the last called number and for convience, its letter
    this.lastCalledNumber = null;
    this.lastCalledLetter = null;
    
    this.cards = [];
   
    // Define the ranges of the bingo numbers
    this.numbers = {
        'b': [ 1, 15],
        'i': [16, 30],
        'n': [31, 45],
        'g': [46, 60],
        'o': [61, 75]
    };

    // Set the game to the first one in the games array
    this.changeGame(0);
}



Bingo.prototype.reset = function() {

    this.uncalledNumbers = [];
    this.calledNumbers = [];

    this.lastCalledNumber = null;
    this.lastCalledLetter = null;

    this.cards = [];

    // Create a set of bingo numbers from 1 to 75
    for(i = 1; i <= 75; i++) {
        this.uncalledNumbers.push(i);
    }

    // Set the game to the first one in the games array
    this.changeGame(0);
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
        for(var pattern in this.winningGame.patterns) {
            var cardCheckArray = [];
            for (var number in bHall.cards[card]) {
                //if((this.calledNumbers.indexOf(bHall.cards[card][number]) > -1) || (bHall.cards[card][number] == 0))  {
                if(this.calledNumbers.indexOf(bHall.cards[card][number]) > -1)  {
                    // If the ball has been called, add a 1
                    cardCheckArray.push(1 && this.winningGame.patterns[pattern][number]);
                }
                else if((number == 12)){
                    // If it's the free space, add whatever is in the winning pattern
                    cardCheckArray.push(this.winningGame.patterns[pattern][number]);
                }
                else {
                    // Otherwise, add a zero
                    cardCheckArray.push(0);
                }
            }

            if(JSON.stringify(cardCheckArray)==JSON.stringify(this.winningGame.patterns[pattern])) {
                bingoCount++;
                break;
            }
        }
    }

    return bingoCount;
}

Bingo.prototype.changeGame = function(gameID) {
    this.winningGame = this.games[gameID];
}


Bingo.prototype.games = [
    {
        name: 'One Corner (anywhere)',
        patterns: [
            [
                1, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0,     
                0, 0, 0, 0, 0
            ],
            [
                0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0,     
                0, 0, 0, 0, 0
            ],
            [
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0,     
                0, 0, 0, 0, 1
            ],
            [
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0,     
                1, 0, 0, 0, 0
            ]
        ]
    },
    {
        name: 'Two Corners (anywhere)',
        patterns: [
            [
                1, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0,     
                0, 0, 0, 0, 0
            ],
            [
                1, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0,     
                0, 0, 0, 0, 1
            ],
            [
                1, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0,     
                1, 0, 0, 0, 0
            ],
            [
                0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0,     
                1, 0, 0, 0, 0
            ],
            [
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0,     
                1, 0, 0, 0, 1
            ],
            [
                0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0,     
                0, 0, 0, 0, 1
            ]
        ]
    },
    {
        name: 'One Line (any way)',
        patterns: [
            [
                1, 1, 1, 1, 1,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0
            ],
            [
                0, 0, 0, 0, 0,
                1, 1, 1, 1, 1,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0
            ],
            [
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                1, 1, 0, 1, 1,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0
            ],
            [
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                1, 1, 1, 1, 1,
                0, 0, 0, 0, 0
            ],
            [
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                1, 1, 1, 1, 1
            ],
            [
                1, 0, 0, 0, 0,
                1, 0, 0, 0, 0,
                1, 0, 0, 0, 0,
                1, 0, 0, 0, 0,
                1, 0, 0, 0, 0
            ],
            [
                0, 1, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 1, 0, 0, 0
            ],
            [
                0, 0, 1, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 1, 0, 0
            ],
            [
                0, 0, 0, 1, 0,
                0, 0, 0, 1, 0,
                0, 0, 0, 1, 0,
                0, 0, 0, 1, 0,
                0, 0, 0, 1, 0
            ],
            [
                0, 0, 0, 0, 1,
                0, 0, 0, 0, 1,
                0, 0, 0, 0, 1,
                0, 0, 0, 0, 1,
                0, 0, 0, 0, 1,
            ],
            [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0,
                0, 0, 0, 0, 1
            ],
            [
                0, 0, 0, 0, 1,
                0, 0, 0, 1, 0,
                0, 0, 1, 0, 0,
                0, 1, 0, 0, 0,
                1, 0, 0, 0, 0,
            ]
        ]
    },
    {
        name: 'Four Corners',
        patterns: [[
            1, 0, 0, 0, 1,
            0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0,     
            1, 0, 0, 0, 1
        ]]
    },
    {
        name: 'Four Stamps',
        patterns: [[
            1, 1, 0, 1, 1,
            1, 1, 0, 1, 1, 
            0, 0, 0, 0, 0, 
            1, 1, 0, 1, 1,     
            1, 1, 0, 1, 1
        ]]
    },
    {
        name: 'Letter C',
        patterns: [[
            0, 1, 1, 1, 1,
            1, 0, 0, 0, 0, 
            1, 0, 0, 0, 0, 
            1, 0, 0, 0, 0,     
            0, 1, 1, 1, 1
        ]]
    },
    {
        name: 'Letter H',
        patterns: [[
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1, 
            1, 1, 1, 1, 1, 
            1, 0, 0, 0, 1,     
            1, 0, 0, 0, 1
        ]]
    },
    {
        name: 'Letter R',
        patterns: [[
            1, 1, 1, 1, 1,
            1, 0, 0, 0, 1, 
            1, 1, 1, 1, 1, 
            1, 0, 0, 1, 0,     
            1, 0, 0, 0, 1
        ]]
    },
    {
        name: 'Letter I',
        patterns: [[
            1, 1, 1, 1, 1,
            0, 0, 1, 0, 0, 
            0, 0, 1, 0, 0, 
            0, 0, 1, 0, 0,     
            1, 1, 1, 1, 1
        ]]
    },
    {
        name: 'Letter S',
        patterns: [[
            1, 1, 1, 1, 1,
            1, 0, 0, 0, 0, 
            1, 1, 1, 1, 1, 
            0, 0, 0, 0, 1,     
            1, 1, 1, 1, 1
        ]]
    },
    {
        name: 'Letter J',
        patterns: [[
            1, 1, 1, 1, 1,
            0, 0, 0, 1, 0, 
            0, 0, 0, 1, 0, 
            1, 0, 0, 1, 0,     
            0, 1, 1, 0, 0
        ]]
    },
    {
        name: 'Letter W',
        patterns: [[
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1, 
            1, 0, 1, 0, 1, 
            1, 1, 0, 1, 1,     
            1, 0, 0, 0, 1
        ]]
    },
    {
        name: 'Letter M',
        patterns: [[
            1, 0, 0, 0, 1,
            1, 1, 0, 1, 1, 
            1, 0, 1, 0, 1, 
            1, 0, 0, 0, 1,     
            1, 0, 0, 0, 1
        ]]
    },
    {
        name: 'Airplane',
        patterns: [[
            0, 0, 0, 1, 0,
            1, 0, 0, 1, 0, 
            1, 1, 1, 1, 1, 
            1, 0, 0, 1, 0,     
            0, 0, 0, 1, 0
        ]]
    },
    {
        name: 'Spacestation',
        patterns: [
                [
                0, 1, 1, 1, 0,
                1, 0, 1, 0, 1, 
                1, 1, 1, 1, 1, 
                1, 0, 1, 0, 1,     
                0, 1, 1, 1, 0
            ]
        ]
    },
    {
        name: 'Martini Glass (empty)',
        patterns: [
                [
                1, 0, 0, 0, 1,
                0, 1, 0, 1, 0, 
                0, 0, 1, 0, 0, 
                0, 0, 1, 0, 0,     
                0, 1, 1, 1, 0
            ]
        ]
    },
    {
        name: 'Martini Glass (full)',
        patterns: [
                [
                1, 1, 1, 1, 1,
                0, 1, 1, 1, 0, 
                0, 0, 1, 0, 0, 
                0, 0, 1, 0, 0,     
                0, 1, 1, 1, 0
            ]
        ]
    },
    {
        name: 'Barbell',
        patterns: [[
            0, 0, 0, 0, 0,
            1, 0, 0, 0, 1, 
            1, 1, 1, 1, 1, 
            1, 0, 0, 0, 1,     
            0, 0, 0, 0, 0
        ]]
    },
    {
        name: 'Butterfly',
        patterns: [[
            1, 0, 0, 0, 1,
            1, 1, 0, 1, 1, 
            1, 0, 1, 0, 1, 
            1, 1, 0, 1, 1,     
            1, 0, 0, 0, 1
        ]]
    },
    {
        name: 'Hut',
        patterns: [[
            0, 0, 1, 0, 0,
            0, 1, 1, 1, 0, 
            1, 1, 1, 1, 1, 
            0, 1, 0, 1, 0,     
            0, 1, 0, 1, 0
        ]]
    },
    {
        name: 'Jail',
        patterns: [[
            1, 0, 1, 0, 1,
            1, 0, 1, 0, 1, 
            1, 0, 1, 0, 1, 
            1, 0, 1, 0, 1,     
            1, 0, 1, 0, 1
        ]]
    },
    {
        name: 'Hour Glass',
        patterns: [[
            1, 1, 1, 1, 1,
            0, 1, 1, 1, 0, 
            0, 0, 1, 0, 0, 
            0, 1, 1, 1, 0,     
            1, 1, 1, 1, 1
        ]]
    },
    {
        name: 'Big 10',
        patterns: [[
            1, 0, 1, 1, 1, 
            1, 0, 1, 0, 1, 
            1, 0, 1, 0, 1, 
            1, 0, 1, 0, 1, 
            1, 0, 1, 1, 1
        ]]
    },
    {
        name: 'Big 18',
        patterns: [[
            1, 0, 1, 1, 1, 
            1, 0, 1, 0, 1, 
            1, 0, 0, 1, 0, 
            1, 0, 1, 0, 1, 
            1, 0, 1, 1, 1
        ]]
    },
    {
        name: 'Sputnik',
        patterns: [[
            1, 0, 0, 0, 1, 
            0, 1, 1, 1, 0, 
            0, 1, 1, 1, 0, 
            0, 1, 1, 1, 0, 
            1, 0, 0, 0, 1
        ]]
    },
    {
        name: 'Kite',
        patterns: [[
            0, 0, 0, 1, 1, 
            0, 0, 0, 1, 1, 
            0, 0, 1, 0, 0, 
            0, 1, 0, 0, 0, 
            1, 0, 0, 0, 0
        ]]
    },
    {
        name: 'Mini X',
        patterns: [[
            0, 0, 0, 0, 0, 
            0, 1, 0, 1, 0, 
            0, 0, 1, 0, 0, 
            0, 1, 0, 1, 0, 
            0, 0, 0, 0, 0
        ]]
    },
    {
        name: 'Big X',
        patterns: [[
            1, 0, 0, 0, 1, 
            0, 1, 0, 1, 0, 
            0, 0, 1, 0, 0, 
            0, 1, 0, 1, 0, 
            1, 0, 0, 0, 1
        ]]
    },
    {
        name: 'Mini Diamond',
        patterns: [[
            0, 0, 0, 0, 0, 
            0, 0, 1, 0, 0, 
            0, 1, 1, 1, 0, 
            0, 0, 1, 0, 0, 
            0, 0, 0, 0, 0
        ]]
    },
    {
        name: 'Big Diamond',
        patterns: [[
            0, 0, 1, 0, 0, 
            0, 1, 1, 1, 0, 
            1, 1, 1, 1, 1, 
            0, 1, 1, 1, 0, 
            0, 0, 1, 0, 0
        ]]
    },
    {
        name: 'Diamond Outline',
        patterns: [[
            0, 0, 1, 0, 0, 
            0, 1, 0, 1, 0, 
            1, 0, 0, 0, 1, 
            0, 1, 0, 1, 0, 
            0, 0, 1, 0, 0
        ]]
    },
    {
        name: 'Corner Baseball (any way)',
        patterns: [
            [
                1, 1, 1, 0, 0, 
                1, 1, 1, 0, 0, 
                1, 1, 1, 0, 0, 
                0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0
            ],
            [
                0, 0, 1, 1, 1, 
                0, 0, 1, 1, 1, 
                0, 0, 1, 1, 1, 
                0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0
            ],
            [
                0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 
                0, 0, 1, 1, 1, 
                0, 0, 1, 1, 1, 
                0, 0, 1, 1, 1
            ],
            [
                0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 
                1, 1, 1, 0, 0, 
                1, 1, 1, 0, 0, 
                1, 1, 1, 0, 0
            ]
        ]
    },
    {
        name: 'Mini Picture Frame',
        patterns: [[
            0, 0, 0, 0, 0, 
            0, 1, 1, 1, 0, 
            0, 1, 0, 1, 0, 
            0, 1, 1, 1, 0, 
            0, 0, 0, 0, 0
        ]]
    },
    {
        name: 'Big Picture Frame',
        patterns: [[
            1, 1, 1, 1, 1, 
            1, 0, 0, 0, 1, 
            1, 0, 0, 0, 1, 
            1, 0, 0, 0, 1, 
            1, 1, 1, 1, 1
        ]]
    },
    {
        name: 'Pyramid',
        patterns: [[
            0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 
            0, 0, 1, 0, 0, 
            0, 1, 1, 1, 0, 
            1, 1, 1, 1, 1
        ]]
    },
    {
        name: 'Blackout',
        patterns: [[
            1, 1, 1, 1, 1, 
            1, 1, 1, 1, 1, 
            1, 1, 1, 1, 1, 
            1, 1, 1, 1, 1, 
            1, 1, 1, 1, 1
        ]]
    }

];