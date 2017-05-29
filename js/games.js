function Games(updateFunction, drawFunction) {
    this.updateFunction = updateFunction;
    this.drawFunction = drawFunction;
    
    this.isRunning = false;

}


Games.prototype.draw = function() {
    if(typeof this.drawFunction == 'function') {
        this.drawFunction();
    }
};

Games.prototype.update = function() {
    if(typeof this.updateFunction == 'function') {
        this.updateFunction();
    }
};

Games.prototype.start = function() {
    if(typeof this.drawFunction == 'function' && typeof this.updateFunction == 'function') {
        this.isRunning = true;
        this.loop();
    }
};

Games.prototype.step = function() {
    if(typeof this.drawFunction == 'function' && typeof this.updateFunction == 'function') {
        this.loop();
    }
};

Games.prototype.stop = function() {
    this.isRunning = false;
};


Games.prototype.loop = function() {
    this.update();
    this.draw();

    if(this.isRunning == true) {
        requestAnimationFrame(this.loop.bind(this));
    }

    
    /*var that = this;
    if(this.isRunning == true) {
        requestAnimationFrame(function(){that.loop()});
    }*/
};