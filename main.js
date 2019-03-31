

/*function createElement(parent,element,text,params){
    if(params === null || params === undefined){
        params = {};
    }
    
    const item = $('<' + element + '>')
                    .text(text)
                    .attr(params)
                    .appendTo(parent);
        
    return item;
}

function createStructure(parent,params,data){
    if(data === null || data === undefined){
        console.error("No hay datos.");
        return;
    }

    const table = createElement(parent,'table',undefined,params.table);
    data.forEach(function(element){
       
    });
    
}

var item = createElement('.container','div',undefined,{class:'title'})

var data = [
    {'Nombre':'Ruben'},
    {'Nombre':'Alba'},
    {'Nombre':'Goonie'},
    {'Nombre':'Pu'}
];

createStructure('.title',{table:{class:'table'}},data);*/

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

function getPositions(element){
    var position = element.position();
    var width = element.width();
    var height = element.height();

    return [[position.left, position.left + width], [position.top, position.top + height]];
}

function comparePositions(ball,player){
    var r1 = player.position().left < ball.position().left + player.outerWidth(true) - 5 ? true : false;
    var r2 = player.position().top > ball.position().top ? true : false;
    var r3 = player.position().top + player.outerHeight(true) < ball.position().top ? true : false;
    
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

function stopBall(ball,player){
    var ballPos = getPositions(ball);
    var playerPos = getPositions(player);
    console.log(comparePositions(ball,player));

    return true;
    /*if((player.position().top < ball.position().top 
        && player.position().top + player.outerHeight(true) > ball.position().top) 
        && player.position().left > ball.position().left + player.outerWidth(true)){
        return true;
    }else{
        return false;
    }*/
}

function stopBallLeft(ball,player){
    if((player.position().top < ball.position().top && player.position().top + player.outerHeight(true) > ball.position().top) && player.position().left < ball.position().left - player.outerWidth(true)){
        return true;
    }else{
        return false;
    }
}

function startGame(ball,player1,player2){
    var direction = "right";
    
    var moving = setInterval(function(){
        
        if(direction === "right"){
            ball.css({'left':ball.position().left+5})
            if(comparePositions(ball,player2)){
                
            }else{
                direction = "left";
            }
        }else if(direction === "left"){
            if(stopBallLeft(ball,player1)){
                ball.css({'left':ball.position().left-5})
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
    switch(e.which){
        case 32:
            startGame(ball,player1,player2);
            break;
        case 119: 
            $('.result.left').text(parseInt($('.result.left').text())+1);
            moveUp(player1); 
            break;
        case 115: 
            moveDown(player1); 
            break;
        case 56:
            $('.result.right').text(parseInt($('.result.right').text())+1);
            moveUp(player2);
            break;
        case 50:
            moveDown(player2);
            break;
    }
});

