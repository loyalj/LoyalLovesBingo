var bHall = new Bingo();
var bCaller = new BingoCaller();
var autoCallTimer = false;
var gamePreviewTimer = false;
var lastGamePreview = 0;
var gamePreviewLength = 6000;
var startCardCount = 30;
var currentGame = 0;


$( document ).ready(function() {
    
    loadGames();
    btnResetBoard()
    

    // Hook game change drop down
    $("#optGame").change(changeGames);
    $("#chkAutoCall").change(changeAutoCall);

    // Hook Buttons
    $("#btnAddCard").click(btnAddCard);
    $("#btnCallNumber").click(btnCallNumber);
    $("#btnCheckBingos").click(btnCheckBingos);
    $("#btnResetBoard").click(btnResetBoard);


    gamePreviewTimer = setInterval(renderGamePreview, gamePreviewLength);
});




function btnCallNumber() {
    if(bHall.uncalledNumbers.length > 0) {
        bHall.callNumber();
		bCaller.callNumber(bHall);

        $("#bn-" + bHall.lastCalledNumber).addClass('called');
        $("#lastNumber").html('' + bHall.lastCalledNumber);
        $("#lastLetter").html(bHall.lastCalledLetter.toUpperCase());
		
		// Hacky way to get the caller to update their timmer... should fix this up a bit
		changeAutoCall();
		
		if((window.speechSynthesis.getVoices().length > 0) && $("#chkCallerSpeech").is(":checked")) {
			
			var bingoCall = new SpeechSynthesisUtterance(); 
			
			bingoCall.voice = window.speechSynthesis.getVoices()[0]; 
			bingoCall.pitch = 0.4; 
			bingoCall.rate = 0.9;
			bingoCall.text = bCaller.lastCallText;
			
			window.speechSynthesis.speak(bingoCall);
		}
    }
}



function btnResetBoard() {
    //Reset the UI
    $(".bingoNumber").removeClass('called');
    $("#lastNumber").html('00');
    $("#lastLetter").html('--');

    // Reset the game model
    bHall.reset();
    bHall.shuffle();

    for(c = 1; c <= startCardCount; c++) {
       bHall.addCard();
    }

    currentGame = 0;
    bHall.changeGame(currentGame);
    $('#optGame').val(currentGame);

    renderCards();
    lastGamePreview = 0;
    renderGamePreview();
}




function btnAddCard() {
    bHall.addCard();
    renderCards();
}



function btnCheckBingos() {
    var bingoCount = bHall.checkBingos();

    if(bingoCount > 0) {
        alert("YOU GOT A BINGO!");

        if($("#chkAutoNextGame").is(":checked") == true) {
            nextGame();
        }
    }
    else {
        alert("YOU GOT NO BINGOS!");
    }
}




function loadGames() {
    $("#optGame").empty();

    for(var game in bHall.games) {
        $("#optGame").append("<option value='" + game + "'>" + bHall.games[game].name + "</option>");
    }
}




function changeGames() {
    bHall.changeGame($(this).val());
    currentGame = $(this).val();
    
    lastGamePreview = 0;
    renderGamePreview();
	renderCards();
}



function nextGame() {
    currentGame++;

    if(currentGame > bHall.games.length - 1) {
        btnResetBoard();
        return;
    }

    bHall.changeGame(currentGame);
    
    lastGamePreview = 0;
    renderGamePreview();

    $('#optGame').val(currentGame);
}




function renderGamePreview() {
    
    // Clear out the old pattern from the board
    $("#winningGame table tbody tr td").removeClass("required");
    

    // Run through the current pattern and display it
    for(var cell in bHall.winningGame.patterns[lastGamePreview]) {
        if(bHall.winningGame.patterns[lastGamePreview][cell] == 1) {
            var cellId = parseInt(cell) + 1;
            $("#wg-" + cellId).addClass("required");
        }
    }

    // Cycle to the next game preview
    lastGamePreview++;

    // Loop at the end of the patterns
    if(lastGamePreview > (bHall.winningGame.patterns.length - 1)) {
        lastGamePreview = 0;
    }
}




function renderCards() {

    $("#cardBoard").empty();

    for (var card in bHall.playerCards) {

        var cardTable = $("<table></table>");
        var currentColumn = 1;
        var rowHTML = "<tr><th>B</th><th>I</th><th>N</th><th>G</th><th>O</th><tr>";
		

        for(var number in bHall.playerCards[card]) {

            var displayText = "";
			var cardNumberClass = "cardNumber";
            
            // Hide the 0 free space
            if(bHall.playerCards[card][number] > 0) {
                displayText = bHall.playerCards[card][number];
            }
			else {
				displayText = "FREE"
				cardNumberClass += " cardFree";
			}
			
			// Mask out the number based on the game being played
			if(bHall.winningGame.mask[number]) {
                cardNumberClass += " maskedNumber"; 
            }
			

            rowHTML += "<td class='" + cardNumberClass + "'>" + displayText + "</td>";
            currentColumn++;

            if(currentColumn > 5) {
                rowHTML += "</tr>";
                currentColumn = 1;
            }
        }

        cardTable.append(rowHTML);
        
        var cardHTML = $("<div class='card'></div>").append(cardTable);

        cardHTML.appendTo("#cardBoard");        
    }
	
	// Add clear div and clicks to the card numbers
	$("<div style='clear: both;'></div>").appendTo("#cardBoard");
    $('.cardNumber').click(clickCardNumber);
}




function clickCardNumber() {
	if($(this).hasClass('maskedNumber')) {
		return;
	}
	
    if($(this).hasClass('dabbed')) {
        $(this).removeClass('dabbed');
    } 
    else {
        $(this).addClass('dabbed');
    }
}




function changeAutoCall() {
    var autoCallVal = $('#chkAutoCall').is(":checked");
    clearInterval(autoCallTimer);
	$("#btnCallNumber").prop('disabled', false);

    if(autoCallVal == true) {
        autoCallTimer = setInterval(btnCallNumber, bCaller.callerCurrentWaitTime);
		$("#btnCallNumber").prop('disabled', true);
    }
}

