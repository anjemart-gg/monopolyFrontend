function Player(name,dispName,offset,color,playerIndex){
    this.space = 0;
    this.name = name;
    this.dispName = dispName;
    this.offset = offset;
    this.bank = 1500;
    this.ownedSpaces = [];
    this.color = color;
    this.jailDelay = 0;
    this.inJail = false;
    this.getOutOfJailFreeCount = 0;
    this.playerPiece = '<div id="'+name+'" style="border: 1px solid black; width:10px;height:10px; position:absolute;left:'
        +(spaces[0].left + offset)+'px;top:'
        +(spaces[0].top + spaceSize/2)+'px;background-color:'+color.toString()+';"></div>';
    this.bankrollInfo = '<div id="'+name+'Bankroll"'
    +'style="border: 1px solid black; font-weight:bold; font-size:40px; width:'+spaceSize*5+'px;height:'+spaceSize+'px; position:absolute;left:'
    +spaceSize*11+'px;top:'
    +spaceSize*playerIndex+'px;background-color:'+color.toString()+';"'
    +'>'+dispName+': '+this.bank+'</div>'
}
var playerNumber = 0;

function buySpace(){
    var space = spaces[curPlayer.space]
    alterBank(curPlayer,space.price*-1);
    space.owner = curPlayer.dispName;
    document.getElementById(curPlayer.space + 1).style.backgroundColor = curPlayer.color;
    //curPlayer.ownedSpaces.push(space.name);
    //let ownedSpacesText = '';
    //for(let spaceName of curPlayer.ownedSpaces){
    //    ownedSpacesText += spaceName + ', '
    //}
    curPlayer.ownedSpaces.push(space);
    //console.log(curPlayer.dispName + ' now owns ' + ownedSpacesText.substring(0,ownedSpacesText.length - 2) )
    closePropertyDialogue();
}
function rollDice(){
    curPlayer = players[playerNumber%players.length];
    die1 = Math.ceil(Math.random()*6);
    die2 = Math.ceil(Math.random()*6);
    document.getElementById('die1').innerHTML = '<img src="'+diceImages[die1 - 1]+'" width="150%"/>';
    document.getElementById('die2').innerHTML = '<img src="'+diceImages[die2 - 1]+'" width="150%"/>';
    console.log(curPlayer.inJail);
    if(curPlayer.inJail){ 
        if(die1 == die2){
            curPlayer.inJail = false;
            alert('You are now out of Jail. So like, enjoy that.');
        }
        else{
            var message = 'You are in Jail for ' + curPlayer.jailDelay + ' turn'
            if(curPlayer.jailDelay!=1){
                message += 's'
            }
            message += '. Roll for doubles to get out.'
            alert(message);
            if(--curPlayer.jailDelay == 0){
                curPlayer.inJail = false;
            }
            playerNumber++;
            curPlayer = players[playerNumber%players.length];
        }
    }
    if(!curPlayer.inJail){//this looks so stupid but limits the amount of code I need to write for now
        let oldPlayerSpace = curPlayer.space;
        curPlayer.space += die2 + die1;
        curPlayer.space = curPlayer.space%40;
        let newPlayerSpace = curPlayer.space;
        movePlayer(curPlayer);
        landOnProperty(curPlayer);
        if(die1 == die2){
            doubleCount++;
            if(doubleCount==3){
                goToJail(curPlayer);
                document.getElementById('playerAlerts').innerHTML = 'Go To Jail';
                playerNumber++;
                document.getElementById('playerspotaudit').innerHTML = players[playerNumber%players.length].dispName + '\'s Turn!';
                curPlayer.inJail = true;
            }
            else{
                document.getElementById('playerAlerts').innerHTML = 'Doubles! Roll Again';
            }
        }
        else{
            doubleCount = 0;
            playerNumber++;
            document.getElementById('playerspotaudit').innerHTML = players[playerNumber%players.length].dispName + '\'s Turn!';
        }
        if(!curPlayer.inJail && (oldPlayerSpace || 0) > newPlayerSpace){//if the player passed go, pay them 200
            alterBank(curPlayer,200);
        }
    }
}
function landOnProperty(player){
    var space = spaces[player.space];
    if(space.name == 'Go To Jail'){
        if(curPlayer.getOutOfJailFreeCount > 0){
            document.getElementById('playerAlerts').innerHTML = 'Get Out of Jail Free card used';
            curPlayer.getOutOfJailFreeCount--;
        }
        else{
            document.getElementById('playerAlerts').innerHTML = 'Go To Jail';
            goToJail(curPlayer);
        }
    }
    else if(typeof(space.price) != 'undefined'){
        if(space.owner == null){
            openPropertyDialogue();
            document.getElementById('playerAlerts').innerHTML = '';
        }
        else{            
            var owner = null;
            //for(let player of players){
            //    if(player.ownedSpaces.indexOf(space.name) > -1){
            //        owner = player;
            //    }
            //}
            for(let player of players){
                for(let ownedSpace of player.ownedSpaces){
                    if(ownedSpace.name = space.name){
                        owner = player;
                    }
                }
            }
            var landingPrice = space.landPrice[space.houseCount];
            if(landingPrice > curPlayer.bank){
                alert(curPlayer.dispName + ' is broke as fuck');
            }
            else{
                alterBank(curPlayer,-1*landingPrice);
                alterBank(owner,landingPrice);
            }
            document.getElementById('playerAlerts').innerHTML = curPlayer.dispName + ' pays ' + owner.dispName;
        }
    }
    else if(space.name == 'Community Chest'){
        //document.getElementById('playerAlerts').innerHTML = 'Draw Community Chest';
        communityChestCards[Math.floor(Math.random() * communityChestCards.length)].action(curPlayer);
    }
    else if(space.name == 'Chance'){
        //document.getElementById('playerAlerts').innerHTML = 'Draw Chance';

        chanceCards[Math.floor(Math.random() * chanceCards.length)].action(curPlayer);
    }
    else if(space.name == 'Income Tax'){
        console.log('Income Tax');
        document.getElementById('playerAlerts').innerHTML = 'Income Tax';
        alterBank(curPlayer,-200);
    }
    else if(space.name == 'Luxury Tax'){
        console.log('Luxury Tax');
        document.getElementById('playerAlerts').innerHTML = 'Luxury Tax';
        alterBank(curPlayer,-75);
    } 
    else{
        document.getElementById('playerAlerts').innerHTML = '';
    }     
}
function goToJail(curPlayer){
    curPlayer.space = 10;
    curPlayer.inJail = true;  
    curPlayer.jailDelay = 3;
    movePlayer(curPlayer);
}
//function to allow players to trade. Finish this later
function trade(playerNum,curPlayerCash,curPlayerProperties,tradePlayerCash,TradePlayerProperties){
    var curPlayer = players[playerNumber%players.length];
    var tradingPlayer = players[playerNum-1];

    curPlayer.bank -= curPlayerCash;
    tradingPlayer.bank -= tradePlayerCash;
}
function alterBank(player, amount){
    player.bank += amount;
    document.getElementById(player.name+'Bankroll').innerHTML = player.dispName + ': ' + player.bank;
}
function movePlayer(player){
    document.getElementById(player.name).style.left = (spaces[player.space].left) + (player.offset)  + 'px';
    document.getElementById(player.name).style.top = spaces[player.space].top + spaceSize/2 + 'px';
}
function goBankrupt(){
    
}
function closePropertyDialogue(){
    document.getElementById('propertyOptions').remove();
}
function openPropertyDialogue(){
    var propertyOptionsDiv = '<div id="propertyOptions" style="'
    +'display:block;border:1px solid black; background-color:#fff2ab; position:absolute; width:'+spaceSize*9+'px; height:'+spaceSize*9+'px; top:'+spaceSize+'px; left:'+spaceSize+'px'
    +'">'
    +'<p style="font-size:70px; text-align:center;">Would you like to purchase '+spaces[curPlayer.space].name+'?</p>'
    +'<button style="width:50%; Height:30%; font-size:50px" onclick="buySpace()">Yes</button>'
    +'<button style="width:50%; Height:30%; font-size:50px" onclick="closePropertyDialogue()">No</button>'
    +'</div>'
    document.getElementById('body').innerHTML += propertyOptionsDiv;
}