var bHall = new Bingo();

$( document ).ready(function() {
    bHall.reset();
    bHall.shuffle();



    for(c = 1; c <= 2; c++) {
       bHall.addCard();
    }

    // Hook Buttons
    $("#btnAddCard").click(btnAddCard);
    $("#btnCallNumber").click(btnCallNumber);
    $("#btnCheckBingos").click(btnCheckBingos);
    $("#btnResetBoard").click(btnResetBoard);

    renderCards();
});




function btnCallNumber() {
    if(bHall.uncalledNumbers.length > 0) {
        bHall.callNumber();

        $("#bn-" + bHall.lastCalledNumber).addClass('called');
        $("#lastNumber").html('' + bHall.lastCalledNumber);
        $("#lastLetter").html(bHall.lastCalledLetter.toUpperCase());
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

    for(c = 1; c <= 2; c++) {
       bHall.addCard();
    }

    renderCards();
}


function btnAddCard() {
    bHall.addCard();
    renderCards();
}

function btnCheckBingos() {
    var bingoCount = bHall.checkBingos();

    if(bingoCount > 1) {
        alert("YOU GOT SOME BINGOS!");
    }
    else if(bingoCount > 0) {
        alert("YOU GOT A BINGO!");    
    }
    else {
        alert("YOU GOT NO BINGOS!");
    }
}

function renderCards() {

    $("#cardBoard").empty();
    
    for (var card in bHall.cards) {

        var cardTable = $("<table></table>");
        var currentColumn = 1;
        var rowHTML = "<tr><th>B</th><th>I</th><th>N</th><th>G</th><th>O</th><tr>";

        for(var number in bHall.cards[card]) {

            displayText = "";
            
            // Hide the 0 free space
            if(bHall.cards[card][number] > 0) {
                displayText = bHall.cards[card][number];
            }

            rowHTML += "<td class='cardNumber'>" + displayText + "</td>";
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

    $('.cardNumber').click(clickCardNumber);
}

function clickCardNumber() {
    if($(this).hasClass('dabbed')) {
        $(this).removeClass('dabbed');
    } 
    else {
        $(this).addClass('dabbed');
    }
}