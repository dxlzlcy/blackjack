var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0;

var hidden;
var deck = [];
var canHit=true;

window.onload=function(){
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck(){
    let values='JQKA23456789'.split('');
    values.push('10');
    let types='CDHS'.split('');
    for(let i=0;i<values.length;i++){
        for(let j=0;j<types.length;j++){
            deck.push(`${values[i]}-${types[j]}`);
        }
    }
}

function shuffleDeck(){
    for(let i=0;i<deck.length;i++){
        let j=Math.floor(Math.random()*deck.length);
        let tmp = deck[j];
        deck[j] = deck[i];
        deck[i] = tmp;
    }
}

function startGame() {
    hidden=deck.pop();
    dealerSum+=getValue(hidden);
    dealerAceCount+=checkAce(hidden);
    while(dealerSum<17){
        var card = deck.pop();
        var cardImg=document.createElement('img');
        cardImg.src = `./cards/${card}.png`
        document.getElementById('dealer-cards').append(cardImg);
        dealerSum += getValue(card);
        dealerAceCount+=checkAce(card);
    }
    for(let i=0;i<2;i++){
        var card = deck.pop();
        var cardImg=document.createElement('img');
        cardImg.src = `./cards/${card}.png`
        document.getElementById('your-cards').append(cardImg);
        yourSum += getValue(card);
        yourAceCount+=checkAce(card);
    }
}

function hit(){
    if(!canHit){
        return
    }
    var card = deck.pop();
    var cardImg=document.createElement('img');
    cardImg.src = `./cards/${card}.png`
    document.getElementById('your-cards').append(cardImg);
    yourSum += getValue(card);
    yourAceCount+=checkAce(card);
    // document.getElementById('your-sum').innerText=checkSum(yourSum,yourAceCount);
    if(checkSum(yourSum,yourAceCount)>21){
        canHit=false;
    }
}

function stay(){
    var msg;
    dealerFinalSum=checkSum(dealerSum,dealerAceCount);
    yourFinalSum=checkSum(yourSum,yourAceCount);
    if(yourFinalSum>21){
        msg='you lose';
    }
    else if(dealerFinalSum>21){
        msg='you win';
    }
    else{
        if(yourFinalSum==dealerFinalSum){
            msg='tie';
        }else if(yourFinalSum>dealerFinalSum){
            msg='you win';
        }else{
            msg='you lose';
        }
    }
    document.getElementById('dealer-sum').innerText=dealerFinalSum;
    document.getElementById('hidden').src=`./cards/${hidden}.png`;
    document.getElementById('your-sum').innerText=yourFinalSum;
    document.getElementById('results').innerText=msg;
}

function getValue(card){
    var data = card.split('-');
    var value = data[0];
    if(isNaN(value)){
        if(value=='A'){
            return 11
        }
        return 10
    }
    return parseInt(value)
}

function checkAce(card){
    return card[0]=='A'?1:0
}

function checkSum(sum,aceCount){
    while(sum>21 && aceCount){
        sum -= 10;
        aceCount-=1;
    }
    return sum;
}


