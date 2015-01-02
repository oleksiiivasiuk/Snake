var MainView = Backbone.View.extend({
    const: {
        RADIUS: 5,
        START_ANGLE: 0,
        END_ANGLE: 6.283186, //Pi*2
        SNAKE_FILL: '#009f00',
        STROKE_STYLE: '#00f000',
        FOOD_FILL: '#fff000',
        BORDER_COLOR: '#ff0000',
        LINE_WIDTH: 2,
        LEFT_ARROW: 37,
        UP_ARROW: 38,
        RIGHT_ARROW: 39,
        DOWN_ARROW: 40,
        MOVE_PIXEL_COUNT: 15,
        MIN_DISTANCE: 10,
        SPEED_OF_REDRAW: 60, // 1000/25=40; (25)frames per second
        MIN_WIDTH: 5,
        MAX_WIDTH: 995,
        MIN_HEIGHT: 5,
        MAX_HEIGHT: 595
    },
    initialize: function() {
        $('html').keydown(jQuery.proxy(this.whenKeyPressed, this));
        this.model.newFood(this.const.MIN_WIDTH, this.const.MIN_HEIGHT, this.const.MAX_WIDTH, this.const.MAX_HEIGHT);
        this.music = new Audio("audio/Teminite-Neurology.mp3");
        this.music.play();
    },
    move: function() {
        this.collection.move(this.const.MOVE_PIXEL_COUNT);
        if(this.collection.checkFood(this.model.getX(), this.model.getY(), this.const.MIN_DISTANCE)){
            this.collection.addNew(this.const.MOVE_PIXEL_COUNT);
            this.model.newFood(this.const.MIN_WIDTH, this.const.MIN_HEIGHT, this.const.MAX_WIDTH, this.const.MAX_HEIGHT);
            this.model.setCount(this.model.getCount()+1);
            var eatSound = new Audio("audio/eat.mp3");
            eatSound.play();
        }
        if(!this.collection.checkBorder(this.const.MIN_WIDTH, this.const.MIN_HEIGHT,
                this.const.MAX_WIDTH, this.const.MAX_HEIGHT)){
            this.theEnd();
            return 0;
        }else{
            if(!this.collection.checkBody(this.const.MIN_DISTANCE)){
                this.theEnd();
                return 0;
            }
        }
        this.render();
    },
    render: function() {
        var canvas = this.el, context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.rect(0,0,this.const.MAX_WIDTH,this.const.MAX_HEIGHT);
        context.lineWidth = this.const.LINE_WIDTH;
        context.strokeStyle = this.const.BORDER_COLOR;
        context.stroke();

        var that = this;
        this.collection.each(function(model) {
            context.beginPath();
            context.arc(model.getX(), model.getY(), that.const.RADIUS, that.const.START_ANGLE, that.const.END_ANGLE);
            context.fillStyle = that.const.SNAKE_FILL;
            context.fill();
            context.lineWidth = that.const.LINE_WIDTH;
            context.strokeStyle = that.const.STROKE_STYLE;
            context.stroke();
        });
        context.beginPath();
        context.arc(this.model.getX(), this.model.getY(), that.const.RADIUS,
            that.const.START_ANGLE, that.const.END_ANGLE);
        context.fillStyle = that.const.FOOD_FILL;
        context.fill();

        context.fillStyle = "blue";
        context.font = "bold 16px Arial";
        context.fillText("Points: "+this.model.getCount(), 1000, 20);
    },
    whenKeyPressed: function(e){
        switch(e.which) {
            case this.const.UP_ARROW: if(this.collection.last().getDirection() !== 2){
                this.collection.last().setDirection(0);
            } break;
            case this.const.RIGHT_ARROW: if(this.collection.last().getDirection() !== 3){
                this.collection.last().setDirection(1);
            } break;
            case this.const.DOWN_ARROW: if(this.collection.last().getDirection() !== 0){
                this.collection.last().setDirection(2);
            } break;
            case this.const.LEFT_ARROW: if(this.collection.last().getDirection() !== 1){
                this.collection.last().setDirection(3);
            } break;
        }
    },
    theEnd: function(){
        window.clearInterval(movementTimer);
        this.music.pause();
        var gameOverSound = new Audio("audio/gameOver.mp3");
        gameOverSound.play();
        var canvas = this.el, context = canvas.getContext("2d");
        context.fillStyle = "black";
        context.font = "bold 40px Arial";
        context.fillText("GAME OVER", 350, 200);
        context.fillText("Thank you for playing", 280, 250);
        context.fillText("Your score: "+this.model.getCount(), 350, 300);
    }
});