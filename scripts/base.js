/**
 * Created by lwx on 2018/3/6.
 * JS主要分成两个部分，第一部分是发牌以及动画效果
 * 第二部分是4副长度为7的牌比较大小；
 * 牌型和点数都一样大的，发牌顺序早的获胜；
 *
 *
 *
 */


$(document).ready(function(e){
    newgame();
});

//var cardList = [];
//for(var i=0 ; i<52 ; i++){
//    cardList[i]=0;
//}
//记录当前手牌和公牌,gamer1/5-6,gamer2/7-8,gamer3/9-10,gamer4/11-12
var handCard = [];
//手牌和公牌元素
var $card = [];
//20个备选游戏人物
var gamerNames = ["王重阳","云中鹤","东方不败","西门吹雪","叶孤城","花满楼","萧十一郎","金蛇郎君","阿飞","小林仙儿","夜神月","阿喀琉斯","胡铁花","小马","风清扬","金木研","御坂美琴","上条当麻","百晓生","天机老人"];
//[0]是游戏人物，[1]是初始金币
//初始化四个游戏人物，本家固定姓名，其他三家随机；
var gamer1 = ["",2000];
var gamer2 = ["",2000];
var gamer3 = ["",2000];
var gamer4 = ["令狐冲",2000];
function newgame(){
    gamer1[0] = setName();
    gamer2[0] = setName();
    gamer3[0] = setName();
    gamer1[1] = 2000;
    gamer2[1] = 2000;
    gamer3[1] = 2000;
    updateName()
    updateScore();

}
function setName(){
    var num;
    do{
        num = parseInt(Math.random()*20);
    }while(gamerNames[num]==gamer1[0]||gamerNames[num]==gamer3[0]||gamerNames[num]==gamer2[0])
    return gamerNames[num];
}
//更新分数和姓名
function updateName(){
    $("#gamer1 .gamer-name").html(gamer1[0]);
    $("#gamer2 .gamer-name").html(gamer2[0]);
    $("#gamer3 .gamer-name").html(gamer3[0]);
    $("#gamer4 .gamer-name").html(gamer4[0]);
}
function updateScore(){
    $("#gamer1 .gamer-score").html(gamer1[1]);
    $("#gamer2 .gamer-score").html(gamer2[1]);
    $("#gamer3 .gamer-score").html(gamer3[1]);
    $("#gamer4 .gamer-score").html(gamer4[1]);
}
//发牌
$("#send").one("click",function(){
    //在0-51中随机取13个数字，以指定发出去的牌
    handCard = getNum(13,0,51);
    $card = [];
    //0，1对应gamer1，类推。最后五张是公牌
    for(var i=0 ; i<13 ; i++){
        $card[i]=$("<div class='card back'></div>");
        $("#cardDB").append($card[i]);
    }
    //$card[11].css("top","400px");
    //for()
    showMoveCard($card[12],"400px","355px");
    setTimeout('showMoveCard($card[11],"400px","435px")',200);
    setTimeout('showMoveCard($card[10],"255px","745px")',600);
    setTimeout('showMoveCard($card[9],"255px","825px")',800);
    setTimeout('showMoveCard($card[8],"50px","355px")',1000);
    setTimeout('showMoveCard($card[7],"50px","435px")',1200);
    setTimeout('showMoveCard($card[6],"255px","-25px")',1400);
    setTimeout('showMoveCard($card[5],"255px","55px")',1600);
    setTimeout('showMoveCard($card[4],"245px","235px")',1800);
    setTimeout('showMoveCard($card[3],"245px","315px")',2000);
    setTimeout('showMoveCard($card[2],"245px","395px")',2200);
    setTimeout('showMoveCard($card[1],"245px","475px")',2400);
    setTimeout('showMoveCard($card[0],"245px","555px")',2600);
    //把公牌和自己的牌面反过来
    setTimeout('{showCardNumber($card[0],handCard[0]);}',3100);
    setTimeout('{showCardNumber($card[1],handCard[1]);}',3100);
    setTimeout('{showCardNumber($card[2],handCard[2]);}',3100);
    setTimeout('{showCardNumber($card[3],handCard[3]);}',3100);
    setTimeout('{showCardNumber($card[4],handCard[4]);}',3100);
    setTimeout('{showCardNumber($card[11],handCard[11]);}',3500);
    setTimeout('{showCardNumber($card[12],handCard[12]);}',3500);

});

$("#game").one("click",function(){
    var winner = match(handCard);
});

