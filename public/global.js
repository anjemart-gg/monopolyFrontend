var die1 = 0;
var die2 = 0;
var doubleCount = 0;
var spaceSize = 69;
var curPlayer = null;
var diceImages = ["roll1.png","roll2.png","roll3.png","roll4.png","roll5.png","roll6.png"];
var chanceCards = [
    {
        name: "Advance to Go",
        action: function(curPlayer){
            curPlayer.space = 0;
            movePlayer(curPlayer);
            alterBank(curPlayer,200);
            alert('Advance to Go, Collect $200');
        }
    }
    ,{
        name: "Advance to Illinois Ave",
        action: function(curPlayer){
            if(curPlayer.space > 24){//passed go
                alterBank(curPlayer,200);
            }
            curPlayer.space = 24;
            movePlayer(curPlayer);
            landOnProperty(curPlayer);
            alert('Advance to Illinios Avenue');
        }
        ,name: "Advance to St. Charles Place",
        action: function(curPlayer){
            if(curPlayer.space > 11){//passed go
                alterBank(curPlayer,200);
            }
            curPlayer.space = 11;
            movePlayer(curPlayer);
            landOnProperty(curPlayer);
            alert('Advance to St. Charles Place');
        }
    }
    ,{
        name: "Advance to Nearest Utility",
        action: function(curPlayer){
            let nearestUtil = curPlayer.space > 11 && curPlayer.space < 18 ? 18:12;
            if(nearestUtil == 12 && curPlayer.space > 12){
                alterBank(curPlayer,200);//passed go
            }
            curPlayer.space = nearestUtil;
            movePlayer(curPlayer);
            landOnProperty(curPlayer)
            alert('Advance to Nearest Utility');
        }
    }
    ,{
        name: "Advance to Nearest Railroad",
        action: function(curPlayer){

            alert('Advance to Nearest Railroad');
        }
    }
    ,{
        name: "Bank Pays You Dividend of $50",
        action: function(curPlayer){
            alterBank(curPlayer,50);
            alert('Bank Pays you Dividend of $50');
        }
    }
    ,{
        name: "Get out of Jail Free",
        action: function(curPlayer){
            curPlayer.getOutOfJailFreeCount++;
            alert('Get Out of Jail Free');
        }
    }
    ,{
        name: "Go Back 3 Spaces",
        action: function(curPlayer){
            curPlayer.space -= 3;
            movePlayer(curPlayer);
            landOnProperty(curPlayer);
            alert('chanceCard');
        }
    }
    ,{
        name: "Go to Jail",
        action: function(curPlayer){
            goToJail(curPlayer);
            alert('chanceCard');
        }        
    }
    ,{
        name: "Make General Repairs to Property",//need to implement
        action: function(){
            let numHouses = 0;
            let numHotels = 0
            alterBank(curPlayer,-1* (numHouses*25 + numHotels * 100))
            alert('Make General Repairs to Property');
        }
    }
    ,{
        name: "Pay Poor Tax of $15",
        action: function(curPlayer){
            alterBank(curPlayer,-15);
            alert('Pay Poor Tax of $15');
        }
    }
    ,{
        name: "Take Trip to Reading Railroad",
        action: function(){
            if(curPlayer.space > 5){//passed go
                alterBank(curPlayer,200);
            }
            curPlayer.space = 5;
            movePlayer(curPlayer);
            landOnProperty(curPlayer);
            alert('Take a Trip to Reading Railroad');
        }
    }
    ,{
        name: "Take a Walk on the Boardwalk",
        action: function(curPlayer){
            curPlayer.space = 39;
            movePlayer(curPlayer);
            landOnProperty(curPlayer);
            alert('Take a Walk on the Boardwalk');
        }
    }
    ,{
        name: "Elected Chairman of the Board, Pay Each Player $50",
        action: function(curPlayer){
            for(let player of players){
                if(player.name != curPlayer.name){
                    alterBank(player,50);
                    alterBank(curPlayer,50);
                }
            }
            alert('Elected Chairman of the Board, Pay Each Player $50');
        }
    }
    ,{
        name: "Building Loan Matures, Collect $150",
        action: function(curPlayer){
            alterBank(curPlayer,150);
            alert(name);
        }
    }
    ,{
        name: "You Won a Crossword Competition, Collect $100",
        action: function(curPlayer){
            alterBank(curPlayer,100);
            alert('You Won a Crossword Competition, Collect $100');
        }
    }
];
var communityChestCards = [
    {
        name: "Advance to Go Community",
        action: function(curPlayer){
            curPlayer.space = 0;
            movePlayer(curPlayer);
            alterBank(curPlayer,200);
            alert("Advance to Go Community");
        }
    }
    ,{
        name: "Bank Error in Your Favor, Collect $200",
        action: function(curPlayer){
            alterBank(curPlayer,200);
            alert('Bank Error in Your Favor, Collect $200');
        }
    }
    ,{
        name: "Doctor's Fee, Pay $50",
        action: function(curPlayer){
            alterBank(curPlayer,-50);
            alert("Doctor's Fee, Pay $50");
        }
    }
    ,{
        name: "From Sale of Stock, You Get $50",
        action: function(curPlayer){
            alterBank(curPlayer,50);
            alert('From Sale of Stock, You Get $50');
        }
    }
    ,{
        name: "Get out of Jail Free",
        action: function(curPlayer){
            curPlayer.getOutOfJailFreeCount++;
            alert("Get out of Jail Free");
        }
    }
    ,{
        name: "Go to Jail",
        action: function(curPlayer){
            goToJail(curPlayer);
            alert("Go to Jail");
        }
    }
    ,{
        name: "Grand Opera Opening Night, Collect $50 from Each Player",
        action: function(curPlayer){
            for(let player of players){
                if(player.name != curPlayer.name){
                    alterBank(player,-50);
                    alterBank(curPlayer,50);
                }
            }
            alert("Grand Opera Opening Night, Collect $50 from Each Player");
        }
    }
    ,{
        name: "Holiday Fund Matures, Collect $50",
        action: function(curPlayer){
            alterBank(curPlayer,50);
            alert("Holiday Fund Matures, Collect $50");
        }
    }
    ,{
        name: "Income Tax Refund, Collect $20",
        action: function(curPlayer){
            alterBank(curPlayer,20);
            alert("Income Tax Refund, Collect $20");
        }
    }
    ,{
        name: "It's your Birthday, Collect $10 from Every Player",
        action: function(curPlayer){
            for(let player of players){
                if(player.name != curPlayer.name){
                    alterBank(player,-10);
                    alterBank(curPlayer,10);
                }
            }
            alert("It's your Birthday, Collect $10 from Every Player");
        }
    }
    ,{
        name: "Life Insurance Matures, Collect $100",
        action: function(curPlayer){
            alterBank(curPlayer,100);
            alert("Life Insurance Matures, Collect $100");
        }
    }
    ,{
        name: "Hospital Fees, Pay $50",
        action: function(curPlayer){
            alterBank(curPlayer,-50);
            alert("Hospital Fees, Pay $50");
        }
    }
    ,{
        name: "School Fees, Pay $50",
        action: function(curPlayer){
            alterBank(curPlayer,-50);
            alert("School Fees, Pay $50");
        }
    }
    ,{
        name: "Receive $25 Consultancy Fee",
        action: function(curPlayer){
            alterBank(curPlayer,25);
            alert("Receive $25 Consultancy Fee");
        }
    }
    ,{
        name: "You Are Assessed for Street Repairs, Pay $40 per House and $100 per Hotel",
        action: function(curPlayer){//implement houses and hotels
            alert("You Are Assessed for Street Repairs, Pay $40 per House and $100 per Hotel");
        }
    }
    ,{
        name: "You Won Second Prize in a Beauty Contest, Collect $10",
        action: function(curPlayer){
            alterBank(curPlayer,10);
            alert("You Won Second Prize in a Beauty Contest, Collect $10");
        }
    }
    ,{
        name: "You Inherit $100",
        action: function(curPlayer){
            alterBank(curPlayer,100);
            alert("You Inherit $100");
        }
    }
];