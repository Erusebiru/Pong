var moving; 

function stopBall(ball,player){
    if(ball.direction === "right"){
        var r1 = player.left < ball.left + player.object.outerWidth(true) ? true : false;
        var end = ball.left >= $('.box').width() - 20 ? true : false;
    }else{
        var r1 = player.left > ball.left - player.object.outerWidth(true) ? true : false;
        var end = ball.left < 4 ? true : false;
    }

    var r2 = player.top > ball.top + 10 ? true : false;
    var r3 = player.top + player.object.outerHeight(true) < ball.top ? true : false;

    if(end){
        return "fin";
    }else{
        if(r1){
            if(r3 || r2){
                return true;
            }else{
                return false;
            }
        }else{
            return true;
        }
    }
}

function checkUpBorder(ball){
    var end = ball.top < 2 ? true : false;
    
    return end;
}

function checkDownBorder(ball){
    var end = ball.top >= $('.box').height() -20 ? true : false;
    
    return end;
}

function whereHitted(ball,player){
    var r1 = player.top < ball.top && player.top + (player.object.outerHeight(true) / 5) >= ball.top ? true : false;
    var r2 = player.top + (player.object.outerHeight(true) / 5) < ball.top && player.top + (player.object.outerHeight(true) / 5 * 2) >= ball.top ? true : false;
    var r3 = player.top + (player.object.outerHeight(true) / 5 * 3) < ball.top && player.top + (player.object.outerHeight(true) / 5 * 4) > ball.top ? true : false;
    var r4 = player.top + (player.object.outerHeight(true) / 5 * 4) < ball.top && player.top + player.object.outerHeight(true) > ball.top ? true : false;

    if(r1){
        return -3;
    }else if(r2){
        return -2;
    }else if(r3){
        return +2;
    }else if(r4){
        return +3;
    }else{
        return 0;
    }
}

function active(ball,player,oppDirection){
    let game = stopBall(ball,player);
    if(game === true){
        ball.MoveWithAngle();
    }else if(game === "fin"){
        clearInterval(moving)
        goal(player);
    } else{
        ball.angle = whereHitted(ball,player);
        ball.direction = oppDirection;
    }
}

function goal(player){
    if(player.object.hasClass("right")){
        player1.scoreUp(player1.score + 1);
        $('.goal').text("GOL DEL PLAYER 2");
    }else{
        player2.scoreUp(player2.score + 1);
        $('.goal').text("GOL DEL PLAYER 1");
    }

    $('.goal').show();
}

function startGame(ball,player1,player2){
    moving = setInterval(function(){
        if(!game.paused){
            if(checkUpBorder(ball) || checkDownBorder(ball)){
                ball.angle = ball.angle * (-1);
            }

            if(ball.direction === "right"){
                ball.MoveRight();
                active(ball,player2,"left")
            }else if(ball.direction === "left"){
                ball.MoveLeft();
                active(ball,player1,"right")
            }
        }
    },game.level);
}

$(document).on('keypress',function(e){
    switch(e.which){
        case 32:
            if(!game.started){
                game.started = true;
                startGame(ball,player1,player2);
            }
            break;
        case 119: 
            player1.moveUp($('.box')); 
            break;
        case 115: 
            player1.moveDown($('.box')); 
            break;
        case 56:
            player2.moveUp($('.box'));
            break;
        case 50:
            player2.moveDown($('.box'));
            break;
        case 80:
        case 112:
            if(!game.paused){
                game.paused = true;
                $('.pause').show();
            }else{
                game.paused = false;
                $('.pause').hide();
            }
            break;
    }
});

const game = new Game(
    false,
    5,
    {"top":$('.ball').position().top,"left":$('.ball').position().left},
    {"top":$('.player.left').position().top+5,"left":$('.player.left').position().left},
    {"top":$('.player.right').position().top+5,"left":$('.player.right').position().left},
    false
);
const player1 = new Player(
    $('.player.left'),
    $('.player.left').position().top+5,
    $('.player.left').position().left,
    0,
    $('.score.left')
);
const player2 = new Player(
    $('.player.right'),
    $('.player.right').position().top+5,
    $('.player.right').position().left,
    0,
    $('.score.right')
);
const ball = new Ball(
    $('.ball'),
    'right',
    0,
    $('.ball').position().top,
    $('.ball').position().left
);