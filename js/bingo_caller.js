function BingoCaller() {
    this.name = "Francis Wheeler";
	this.callerCurrentWaitTime = 250;
	this.lastCallText = "";
}

BingoCaller.prototype.callNumber = function(bingoHall) {
	
	var callText = "";
	var waitTime = 0;
	
	// Colour commentary based on number of balls called
	switch(bingoHall.calledNumbers.length) {
		case 1:
			callText += "Your first number for the game is... ";
			waitTime += 2000;
			break;
		case 10:
			callText += "Your 10th number up is... ";
			waitTime += 3000;
			break;
	}
	
	
	// Add the number call at the end of any commentary
	if(bingoHall.winningGame.unusedCols.includes(bingoHall.lastCalledLetter)) {
		// Call the number in the short format and wait less time, because this game cannot make use of numbers from this column
		callText += "{0} {1}.".format(bingoHall.lastCalledLetter, bingoHall.lastCalledNumber);
		waitTime += 3000;
	}
	else {
		// Call the number in the long format and wait the normal time
		callText += "{0} {1}. {0}. Number {1}.".format(bingoHall.lastCalledLetter, bingoHall.lastCalledNumber);
		waitTime += 14000;
	}
	
	// Store the updated info
	this.lastCallText = callText;
	this.callerCurrentWaitTime = waitTime; 
}


String.prototype.format = function() {
  a = this;
  for (k in arguments) {
    a = a.replace(RegExp("\\{" + k + "\\}", 'gi'), arguments[k]);
  }
  return a
}