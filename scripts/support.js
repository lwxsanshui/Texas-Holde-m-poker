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
    var gamer2_card = handCard.slice(0,7);
    var gamer1_card = handCard.slice(0,5).concat(handCard.slice(7,9));
    var gamer3_card = handCard.slice(0,5).concat(handCard.slice(9,11));
    var gamer4_card = handCard.slice(0,5).concat(handCard.slice(11));
    var bigCard1 = maxCard(gamer1_card);
    var bigCard2 = maxCard(gamer2_card);
    var bigCard3 = maxCard(gamer3_card);
    var bigCard4 = maxCard(gamer4_card);
    var winner = maxMatch(bigCard1,bigCard2,bigCard3,bigCard4);

    for(var l=5; l<11 ; l++){
        showCardNumber($card[l],handCard[l]);
    }
    var winnerStr="机器人";
    switch (winner){
        case 1:winnerStr=gamer1[0];
            gamer1[1]+=900;
            gamer2[1]-=300;
            gamer3[1]-=300;
            gamer4[1]-=300;
            break;
        case 2:winnerStr=gamer2[0];
            gamer1[1]-=300;
            gamer2[1]+=900;
            gamer3[1]-=300;
            gamer4[1]-=300;
            break;
        case 3:winnerStr=gamer3[0];
            gamer1[1]-=300;
            gamer2[1]-=300;
            gamer3[1]+=900;
            gamer4[1]-=300;
            break;
        case 4:winnerStr=gamer4[0];
            gamer1[1]-=300;
            gamer2[1]-=300;
            gamer3[1]-=300;
            gamer4[1]+=900;
            break;
        break;
    }
    $("#win").html(winnerStr+"赢了");

    updateScore();

}
function maxMatch(a,b,c,d){
    var winnerArr = [];
    var winnername = [];
    var scale = Math.max(a[5],b[5],c[5],d[5]);
    if(a[5]==scale){
        winnerArr.push(a);
        winnername.push(1);
    }
    if(b[5]==scale){
        winnerArr.push(b);
        winnername.push(2);
    }
    if(c[5]==scale){
        winnerArr.push(c);
        winnername.push(3);
    }
    if(d[5]==scale){
        winnerArr.push(d);
        winnername.push(4);
    }
    //如果该层级只有一个
    if(winnerArr.length==1)return winnername[0];
    //如果该层级有两个
    else if(winnerArr.length==2){
        if(scale>3){
            if(scale!=4){
                return winnerArr[0][4]>winnerArr[1][4]?winnername[0]:winnername[1];
            }else{
                return matchOrNum(winnerArr[0],winnerArr[1])?winnername[0]:winnername[1];
            }
        }else{
            if(winnerArr[0][0]>winnerArr[1][0]){
                return winnername[0];
            }else if(winnerArr[0][0]<winnerArr[1][0]){
                return winnername[1];
            }else{
                return winnerArr[0][4]>winnerArr[1][4]?winnername[0]:winnername[1];
                for(var l=4 ; l>1 ; l--){
                    if(winnerArr[0][l]>winnerArr[1][l]){
                        return winnername[0];
                    }else if(winnerArr[0][l]<winnerArr[1][l]){
                        return winnername[1];
                    }else if(l==2){
                        return winnername[1];
                    }
                }
            }
        }
    }
    //如果该层级有三个
    if(winnerArr.length==3){
        if(scale>3){//如果是顺子或者同花
            if(scale!=4){
                if(winnerArr[0][4]>winnerArr[1][4]){
                    if(winnerArr[0][4]>winnerArr[2][4]){
                        return winnername[0];
                    }else{
                        return winnername[2];
                    }
                }else if(winnerArr[1][4]>winnerArr[2][4]){
                    return winnername[1];
                }else{
                    return winnername[2];
                }
            }else{//同花
                if(matchOrNum(winnerArr[0],winnerArr[1])){
                    if(matchOrNum(winnerArr[0],winnerArr[2])){
                        return winnername[0];
                    }else{
                        return winnername[2];
                    }
                }else{
                    if(matchOrNum(winnerArr[1],winnerArr[2])){
                        return winnername[1];
                    }else{
                        return winnername[2];
                    }
                }
            }//顺子或同花结束
        }else{//该层级有三个，且为1/2/3级
            if(winnerArr[0][0]>winnerArr[1][0]){//这部分是a>b
                if(winnerArr[0][0]>winnerArr[2][0]){
                    return winnername[0];
                }else if(winnerArr[0][0]<winnerArr[2][0]){
                    return winnername[2];
                }else{//A>B,A=C
                    if(matchOrNum(winnerArr[0],winnerArr[2])){
                        return winnername[0];
                    }else{
                        return winnername[2];
                    }
                }
            }else if(winnerArr[1][0]>winnerArr[0][0]){//这部分是a<b
                if(winnerArr[1][0]>winnerArr[2][0]){
                    return winnername[1];
                }else if(winnerArr[1][0]<winnerArr[2][0]){
                    return winnername[2];
                }else{//A>B,A=C
                    if(matchOrNum(winnerArr[1],winnerArr[2])){
                        return winnername[1];
                    }else{
                        return winnername[2];
                    }
                }
            }else{//这部分是a=b
                if(winnerArr[2][0]>winnerArr[0][0]){//c最大
                    return winnername[2];
                }else if(winnerArr[2][0]<winnerArr[0][0]){//这里只需要比较ab
                    if(matchOrNum(winnerArr[0],winnerArr[1])){
                        return winnername[0];
                    }else{
                        return winnername[1];
                    }
                }else {//abc都需要比
                    if(matchOrNum(winnerArr[0],winnerArr[1])){
                        if(matchOrNum(winnerArr[0],winnerArr[2])){
                            return winnername[0];
                        }else{
                            return winnername[2];
                        }
                    }else{
                        if(matchOrNum(winnerArr[1],winnerArr[2])){
                            return winnername[1];
                        }else{
                            return winnername[2];
                        }
                    }

                }
            }
        }
    }//三个一样的结束
    if(winnerArr.length==4){//四个
        if(scale==0||scale==4){//是单排或者同花
            return winnername[(matchOrFour(winnerArr[0],winnerArr[1],winnerArr[2],winnerArr[3]))-1];
        }else if(scale==3||scale==5){//顺子
            return winnername
        }else{//对子，三条，四条
            var _arr = matchNumFour(winnerArr[0][0],winnerArr[1][0],winnerArr[2][0],winnerArr[3][0]);
            if(_arr.length==1){
                return winnername[_arr[0]-1];
            }else if(_arr.length==2){
                if(matchOrNum(winnerArr[_arr[0]-1],winnerArr[_arr[1]-1])){
                    return winnername[_arr[0]-1];
                }else{
                    return winnername[_arr[1]-1];
                }
            }else if(_arr.length==3){
                if(matchOrNum(winnerArr[_arr[0]-1],winnerArr[_arr[1]-1])){
                   if(matchOrNum(winnerArr[_arr[0]-1],winnerArr[_arr[2]-1])){
                       return winnername[_arr[0]-1];
                   } else{
                       return winnername[_arr[2]-1];
                   }
                }else{
                    if(matchOrNum(winnerArr[_arr[1]-1],winnerArr[_arr[2]-1])){
                        return winnername[_arr[1]-1];
                    } else{
                        return winnername[_arr[2]-1];
                    }
            }
        }else{//4个
                var _a = matchOrFour(winnerArr[0],winnerArr[1],winnerArr[2],winnerArr[3]);
                return winnername[_a-1];
            }
        }
    }

}
//找出最大的牌序，返回长度为6的数组，第6位是牌的级别，越高越大
//单排0，对子1，三条2，四条3，顺子4，同花5，同花顺6
function maxCard(arr){
    var result = [];
    var a =[];
    var b=[];
    var c=[];
    var d=[];
    for(var i=0 ; i<7 ; i++){
        var temp = parseInt(arr[i]/13);
        switch (temp){
            case 0 :a.push(arr[i]);break;
            case 1 :b.push(arr[i]);break;
            case 2 :c.push(arr[i]);break;
            case 3 :d.push(arr[i]);break;
        }
    }
    //如果同色大于等于5张，
    if(Math.max(a.length, b.length, c.length, d.length)>4){
        if(b.length>4){
            a=b;
        }else if(c.length>4){
            a=c;
        }else if(d.length>4){
            a=d;
        }
        //最大的赋给a然后排序
        for(var i=0 ; i< a.length ; i++){
            if(a[i]%13==0){
                a[i]=a[i]+13;
            }
        }
        a.sort(sortNumber);
        //判断是不是同花顺
        if(a.length>4){
            for(var k=4;k<a.length;k++){
                if(issnake(a.slice(k-4,k+1))){
                    result = a.slice(k-4,k+1);
                result.push(6);
                    return result;
                }
            }
        }
        //不是同花顺则是同花
        result = a.slice(a.length-5);
        result.push(5);

    }else{//如果不是同花
        var _arr = []
        for(var i=0 ; i<7 ; i++){
            if(arr[i]%13==0){
                _arr.push(14)
            }else{
                _arr.push(arr[i]%13+1);
            }
        }
        _arr.sort(sortNumber);
        //判断是不是顺子
        var _arrU = unique(_arr);
        if(_arrU.length>4){
            for(var k=4;k<_arrU.length;k++){
                if(issnake(_arrU.slice(k-4,k+1))){
                    result = _arrU.slice(k-4,k+1);
                result.push(4);
                return result;
                }
            }
            
        }
        //不是同花也不是顺子
        var maxS = maxSame(_arr);
        if(maxS==1){//散排
            result = _arr.slice(2);
            result.push(0);
        }else if(maxS==2){//对子
            for(var i=5 ; i>=0 ; i--){
                if(_arr[i]==_arr[i+1]){
                    result.push(_arr[i]);
                    result.push(_arr[i+1]);
                    var __temp = [];
                    for(var j=0 ; j<7 ;j++){
                        if(j!=i&&j!=i+1){
                            __temp.push(_arr[j]);
                        }
                    }
                    result.push(__temp[2]);
                    result.push(__temp[3]);
                    result.push(__temp[4]);
                    result.push(1)
                    i=-1;
                }
            }
        }else if(maxS==3){//三条
            for(var i=4 ; i>=0 ; i--){
                if(_arr[i]==_arr[i+1]&&_arr[i]==_arr[i+2]){
                    result.push(_arr[i]);
                    result.push(_arr[i+1]);
                    result.push(_arr[i+2]);
                    var __temp = [];
                    for(var j=0 ; j<7 ;j++){
                        if(j!=i&&j!=i+1&&j!=i+2){
                            __temp.push(_arr[j]);
                        }
                    }
                    result.push(__temp[2]);
                    result.push(__temp[3]);
                    result.push(2);
                    i=-1;
                }
            }
        }else if(maxS==4){//四条
            for(var i=3 ; i>=0 ; i--){
                if(_arr[i]==_arr[i+1]&&_arr[i]==_arr[i+2]&&_arr[i]==_arr[i+3]){
                    result.push(_arr[i]);
                    result.push(_arr[i+1]);
                    result.push(_arr[i+2]);
                    result.push(arr[i+3]);
                    var __temp = [];
                    for(var j=0 ; j<7 ;j++){
                        if(j!=i&&j!=i+1&&j!=i+2&&j!=i+3){
                            __temp.push(_arr[j]);
                        }
                    }
                    result.push(__temp[2]);
                    result.push(3);
                    i=-1;
                }
            }
        }
    }
    return result;
}
//有序数组去重
function unique(arr){
    var arr2 = [arr[0]] ;
    for(var k=1 ; k<arr.length ; k++){
        if(arr[k]!=arr[k-1]){
            arr2.push(arr[k]);
        }
    }
    return arr2;
}
//判断是否顺子，arr长度为5的有序数组
function issnake(arr){
    if(arr[4]-arr[0]!=4){
        return false;
    }else{
        return true;
    }
}
//有序数组判断相同的牌有几张
function maxSame(arr){
    var result = 1;
    for(var k=1 ; k<arr.length;k++){
        if(arr[k]==arr[k-1])
            result = 2;
    }
    if(result ==2){
        for(var k=2 ; k<arr.length;k++){
            if(arr[k]==arr[k-1]&&arr[k]==arr[k-2])
                result=3;
        }
    }
    if(result==3){
        for(var k=3 ; k<arr.length;k++){
            if(arr[k]==arr[k-1]&&arr[k]==arr[k-2]&&arr[k]==arr[k-3])
                result=4;
        }
    }
    return result ;
}
function sortNumber(a, b) {

    return a - b;

}
//比较两个有序数组的大小，第一个大则返回真，相同或者第二个大则返回假
function matchOrNum(arr,brr){
    for(var i=arr.length-1;i>=0;i--){
        if(arr[i]>brr[i]){
            return true;
        }else if(arr[i]<brr[i]){
            return false;
        }
    }
    return false;
}
//比较四个里面那个大，返回1234
function matchOrFour(arr,brr,crr,drr){
    if(matchOrNum(arr,brr)){
        if(matchOrNum(arr,crr)){
            if(matchOrNum(arr,drr)){
                return 1;
            }else{
                return 4;
            }
        }else if(matchOrNum(crr,drr)){
            return 3;
        }else{
            return 4;
        }
    }else if(matchOrNum(brr,crr)){//已知b>a
        if(matchOrNum(brr,drr)){
            return 2;
        }else{
            return 4;
        }
    }else if(matchOrNum(crr,drr)){
        return 3;
    }else{
        return 4;
    }
}
//比较四个数，返回数组
function matchNumFour(a,b,c,d){
    var arr = [];
    if(a>b){//a>b 开始
        if(a>c){
            if(a>d){
                arr.push(1);
            }else if(a<d){
                arr.push(4);
            }else{
                arr.push(1);
                arr.push(4);
            }
        }else if(a<c){
            if(c>d){
                arr.push(3);
            }else if(c<d){
                arr.push(4);
            }else{
                arr.push(3);
                arr.push(4);
            }
        }else{ //a>b&&a==c
            if(c<d){
                arr.push(4);
            }else if(c>d){
                arr.push(1);
                arr.push(3);
            }else{
                arr.push(1);
                arr.push(3);
                arr.push(4);
            }
        }
    }else if(a<b){//a>b结束,a<b开始
        if(b>c){
            if(b>d){
                arr.push(2);
            }else if(b<d){
                arr.push(d);
            }else{
                arr.push(2);
                arr.push(4);
            }
        }else if(b<c){
            if(c>d){
                arr.push(3);
            }else if(c<d){
                arr.push(4);
            }else{
                arr.push(3);
                arr.push(4);
            }
        }else{ //a>b&&a==c
            if(c<d){
                arr.push(4);
            }else if(c>d){
                arr.push(2);
                arr.push(3);
            }else{
                arr.push(2);
                arr.push(3);
                arr.push(4);
            }
        }
    }else{//a<b结束，a==b开始
        if(a>c){
            if(a>d){
                arr.push(1);
                arr.push(2);
            }else if(a<d){
                arr.push(4);
            }else{
                arr.push(1);
                arr.push(2);
                arr.push(4);
            }
        }else if(a<c){
            if(c>d){
                arr.push(3);
            }else if(c<d){
                arr.push(4);
            }else{
                arr.push(3);
                arr.push(4);
            }
        }else{
            if(a>d){
                arr.push(1);
                arr.push(2);
                arr.push(3);
            }else if(a<d){
                arr.push(4);
            }else{
                arr.push(1);
                arr.push(2);
                arr.push(3);
                arr.push(4);
            }
        }
    }
    return arr;
}
