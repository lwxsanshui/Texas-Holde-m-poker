/**
 * Created by lwx on 2018/3/7.
 */
function getNum(len,start,end){
    var arr = [];
    function _inner(start, end) {
    var span = end - start;
    return parseInt(Math.random() * span + start)
    }
    while (arr.length < len) {
    var num = _inner(start, end);
    if (arr.indexOf(num) == -1) {
        arr.push(num);
        }
    }
    return arr;
}

function showMoveCard($c,x,y){
    $c.animate({
        top:x,
        left:y
    },400);
}
    //翻牌
function showCardNumber($c,num){
    var n = (num)%13+1;
    var c = parseInt((num+1)/13);
    if(c==0){
        $c.removeClass("back");
        $c.addClass("front_black");
        if(n==1){
            $c.html("A♠");
        }else
        if(n<11){
            $c.html(n + "♠");
        }else if(n==11){
            $c.html( "J♠");
        }else if(n==12){
            $c.html( "Q♠");
        }else{
            $c.html( "K♠");
        }
    }
    if(c==1){
        $c.removeClass("back");
        $c.addClass("front_red");
        if(n==1){
            $c.html("A♥");
        }else
        if(n<11){
            $c.html(n + "♥");
        }else if(n==11){
            $c.html( "J♥");
        }else if(n==12){
            $c.html( "Q♥");
        }else{
            $c.html( "K♥");
        }
    }
    if(c==2){
        $c.removeClass("back");
        $c.addClass("front_black");
        if(n==1){
            $c.html("A♣");
        }else
        if(n<11){
            $c.html(n + "♣");
        }else if(n==11){
            $c.html( "J♣");
        }else if(n==12){
            $c.html( "Q♣");
        }else{
            $c.html( "K♣");
        }
    }
    if(c==3){
        $c.removeClass("back");
        $c.addClass("front_red");
        if(n==1){
            $c.html("A♦");
        }else
        if(n<11){
            $c.html(n + "♦");
        }else if(n==11){
            $c.html( "J♦");
        }else if(n==12){
            $c.html( "Q♦");
        }else{
            $c.html( "K♦");
        }
    }
}
//比较大小
function match(handCard){
    var gamer1_card = handCard.slice(0,7);
    var gamer2_card = handCard.slice(0,5).concat(handCard.slice(7,9));
    var gamer3_card = handCard.slice(0,5).concat(handCard.slice(9,11));
    var gamer4_card = handCard.slice(0,5).concat(handCard.slice(11));

}