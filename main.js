
class Ball{
    object;
    direction;
    angle;
    top;
    left;
    constructor(object,direction,angle,top,left){
        this.object = object;
        this.direction = direction;
        this.angle = angle;
        this.top = top;
        this.left = left;
    }

    set direction(direction){
        this.direction = direction;
    }

    get top(){
        return this.top;
    }

    set top(top){
        this.object.css({'top':this.top-1})
        this.top = top;
    }

    get left(){
        return this.left;
    }

    set left(left){
        this.object.css({'left':this.left+5})
        this.left = left;
    }
}

function moveUp(player){
    
    if(player.position().top > 2){
        player.css({'bottom':'initial','top':player.position().top-5});
    }
    
}

function moveDown(player){
    if(player.position().top + 100 < 482){
        player.css({'bottom':'initial','top':player.position().top+5});
    }
}

function stopBall(ball,player,direction){
    if(direction === "right"){
        var r1 = player.position().left < ball.position().left + player.outerWidth(true) - 5 ? true : false;
        var end = ball.position().left >= $('.box').width() - 20 ? true : false;
    }else{
        var r1 = player.position().left > ball.position().left - player.outerWidth(true) ? true : false;
        var end = ball.position().left < 12 ? true : false;
    }

    var r2 = player.position().top > ball.position().top ? true : false;
    var r3 = player.position().top + player.outerHeight(true) < ball.position().top ? true : false;

    if(end){
        return "fin";
    }else{
        if(r1){
            if(r3){
                return true;
            }else if(r2){
                return true;
            }else{
                return false;
            }
        }else{
            return true;
        }
    }
    
}

function checkBorder(ball){
    var end = ball.position().top < 10 ? true : false;
    ball.css({'top':ball.position().top-1})

}

function startGame(ball,player1,player2){
    var direction = "right";
    
    var moving = setInterval(function(){
        
        if(direction === "right"){
            let game = stopBall(ball,player2,direction);
            ball.css({'left':ball.position().left+5})
            checkBorder(ball)
            if(game === true){
                
            }else if(game === "fin"){
                clearInterval(moving)
                $('.result.left').text(parseInt($('.result.left').text())+1);
            }  else{
                direction = "left";
            }
        }else if(direction === "left"){
            let game = stopBall(ball,player1,direction);
            ball.css({'left':ball.position().left-5})
            if(game === true){
            
            }else if(game === "fin"){
                clearInterval(moving)
                $('.result.right').text(parseInt($('.result.right').text())+1);
            }else{
                direction = "right";
            }
        }
        
    },15);
}

$(document).on('keypress',function(e){
    const player1 = $('.player.left');
    const player2 = $('.player.right');
    const ball = $('.ball');
    const ball2 = new Ball($('.ball'),'right',undefined,'400','500')
    ball2.top = '430';
    console.log(ball2.top)
    switch(e.which){
        case 32:
            startGame(ball,player1,player2);
            break;
        case 119: 
            moveUp(player1); 
            break;
        case 115: 
            moveDown(player1); 
            break;
        case 56:
            moveUp(player2);
            break;
        case 50:
            moveDown(player2);
            break;
    }
});

