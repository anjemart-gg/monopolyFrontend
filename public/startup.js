function addUI(){
    var rollButton = '<button id="rollDice" onclick="rollDice()" style="width: '+spaceSize*2+'px;height: '
        +spaceSize*2+'px;position: absolute;left: '+spaceSize*8+'px;top: '+spaceSize*8+'px;font-size:30px;">Roll Dice</button>'
    var diedisp1 = '<div id="die1" style="width: '+spaceSize+'px;height: '
        +spaceSize+'px;position: absolute;left: '+spaceSize*6+'px;top: '+spaceSize*6+'px;font-size:60px;"></div>';
    var diedisp2 = '<div id="die2" style="width: '+spaceSize+'px;height: '
        +spaceSize+'px;position: absolute;left: '+spaceSize*4+'px;top: '+spaceSize*6+'px;font-size:60px;"></div>';
    var playerAlerts = '<div id="playerAlerts" style="width: '+spaceSize*7+'px;height: '
        +spaceSize+'px;position: absolute;left: '+spaceSize*2+'px;top: '+spaceSize*4+'px;font-size:60px;"></div>';
    var playerspace = '<div id="playerspotaudit" style="width: '+spaceSize+'px;height: '
        +spaceSize+'px;position: absolute;left: '+spaceSize*2+'px;top: '+spaceSize*2+'px;width:'+spaceSize*9
        +'px;font-size:60px;">'+players[0].dispName+'\'s Turn!</div>';
    var playerInformation = '';
    for(let player of players){
        playerInformation += player.playerPiece;
        playerInformation += player.bankrollInfo;
    }
    var playerDialogue = '<div style="position: absolute; left: '+spaceSize*11+'px;top: '+spaceSize*4+'px;width:'+spaceSize*11
    +'px; height: '+spaceSize*7+'px; background-color: #6a96cc; border: 1px solid black;">'
    +'<button style="position:absolute; left:0%; top:50%">Manage Properties</button>'
    +'<button style="position:absolute; left:50%;top:50%">Propose Trade</button>'
    +'</div>';
    document.getElementById('body').innerHTML += rollButton + diedisp1 
        + diedisp2 + playerAlerts + playerspace + playerInformation + playerDialogue;
}
var playerDistance = 5;
var players = [];

function setupBoard(){
    document.getElementById('body').innerHTML += '<div style="position: absolute; left:0px; top: 0px; width:'+(spaceSize*11+1)+'px; height:'
    +(spaceSize*11+1)+'px; background-color: #BFDBAE"></div>';
    getBoardData().then( response => {
    for(let space of spaces){
        createSquare(space);
    }
    }).then(response => {
        players.push(new Player('player1','Player 1',playerDistance,'red',0));
        players.push(new Player('player2','Player 2',(spaceSize/4 + playerDistance),'blue',1));
        players.push(new Player('player3','Player 3',(spaceSize/4*2 + playerDistance),'yellow',2));
        players.push(new Player('player4','Player 4',(spaceSize/4*3 + playerDistance),'green',3));
        addUI();
    })
}    
//need to add this functionality for when someone loses
