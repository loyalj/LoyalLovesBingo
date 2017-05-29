var bHall = new Bingo();

$( document ).ready(function() {
    bHall.reset();
    bHall.shuffle();

    // Hook Buttons
    $("#btnCallNumber").click(btnCallNumber);
    $("#btnResetBoard").click(btnResetBoard);
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
}

