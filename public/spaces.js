function createSquare(space){
    if(space.id < 11){
        var rotationText = '';
    }
    else if(space.id < 21){
        var rotationText = 'transform: rotate(90deg);';
    }
    else if(space.id < 31){
        var rotationText = 'transform: rotate(180deg);';
    }
    else{
        var rotationText = 'transform: rotate(270deg);';
    }
    var divText = '<div id="'+space.id+'" style="'+rotationText+'border:1px solid black;position:absolute;height:'+spaceSize+'px;width:'
        +spaceSize+'px;top:'+space.top+'px;left:'+space.left+'px;overflow-wrap: break-word; font-size:12px;text-align: center;">';
    if(typeof(space.grouping) != 'undefined'){
        var divOrientation = 'height:30%; width:97%;';
        
        divText += '<div style=" border: 1px solid black; overflow: none;'+divOrientation+' background-color:'+groupingColors[space.grouping]+';"></div>'
    }
    divText += space.name+'</div>';
    document.getElementById('body').innerHTML += divText;
}

var groupingColors = [
    '#41009c',
    '#71d8e3',
    '#ff3d9e',
    '#fc721c',
    '#ff0000',
    '#fffb00',
    '#13a600',
    '#00458f',
];
var spaces = [
    {
        name: 'GO',
        top: 10*spaceSize,
        left: 10*spaceSize,
        id:1
    },
    {
        name: 'Mediterranian Avenue',
        top: 10*spaceSize,
        left: 9*spaceSize,
        id:2,
        grouping:0,
        price:60,
        owner:null,
        houseCount:0,
        landPrice: [2,10,30,90,160,250],
        mortgage: 30
    },
    {
        name: 'Community Chest',
        top: 10*spaceSize,
        left: 8*spaceSize,
        id:3
    },
    {
        name: 'Baltic Avenue',
        top: 10*spaceSize,
        left: 7*spaceSize,
        id:4,
        grouping:0,
        price:60,
        owner:null,
        houseCount:0,
        landPrice: [20,60,180,320,450],
        mortgage: 30
    },
    {
        name: 'Income Tax',
        top: 10*spaceSize,
        left: 6*spaceSize,
        id:5
    },
    {
        name: 'Reading Railroad',
        top: 10*spaceSize,
        left: 5*spaceSize,
        id:6,
        price:200,
        owner:null,
        mortgage: 30
    },
    {
        name: 'Oriental Avenue',
        top: 10*spaceSize,
        left: 4*spaceSize,
        id:7,
        grouping:1,
        price:100,
        owner:null,
        houseCount:0,
        landPrice: [30,90,270,400,550],
        mortgage: 30
    },
    {
        name: 'Chance',
        top: 10*spaceSize,
        left: 3*spaceSize,
        id:8
    },
    {
        name: 'Vermont Avenue',
        top: 10*spaceSize,
        left: 2*spaceSize,
        id:9,
        grouping:1,
        price:100,
        owner:null,
        houseCount:0,
        landPrice: [30,90,270,400,550],
        mortgage: 30
    },
    {
        name: 'Connecticut Avenue',
        top: 10*spaceSize,
        left: 1*spaceSize,
        id:10,
        grouping:1,
        price:120,
        owner:null,
        houseCount:0,
        landPrice: [40,100,300,450,600],
        mortgage: 30
    },
    {
        name: 'Jail',
        top: 10*spaceSize,
        left: 0*spaceSize,
        id:11
    },
    {
        name: 'St. Charles Place',
        top: 9*spaceSize,
        left: 0*spaceSize,
        id:12,
        grouping:2,
        price:140,
        owner:null,
        houseCount:0,
        landPrice: [50,150,450,625,750],
        mortgage: 30
    },
    {
        name: 'Electric Company',
        top: 8*spaceSize,
        left: 0*spaceSize,
        id:13,
        price:150,
        owner:null,
        mortgage: 30
    },
    {
        name: 'States Avenue',
        top: 7*spaceSize,
        left: 0*spaceSize,
        id:14,
        grouping:2,
        price:140,
        owner:null,
        houseCount:0,
        landPrice: [50,150,450,625,750],
        mortgage: 30
    },
    {
        name: 'Virginia Avenue',
        top: 6*spaceSize,
        left: 0*spaceSize,
        id:15,
        grouping:2,
        price:160,
        owner:null,
        houseCount:0,
        landPrice: [60,180,500,700,900],
        mortgage: 30
    },
    {
        name: 'Pennsylvania Railroad',
        top: 5*spaceSize,
        left: 0*spaceSize,
        id:16,
        price:200,
        owner:null,
        mortgage: 30
    },
    {
        name: 'St. James Place',
        top: 4*spaceSize,
        left: 0*spaceSize,
        id:17,
        grouping:3,
        price:180,
        owner:null,
        houseCount:0,
        landPrice: [70,200,550,750,950],
        mortgage: 30
    },
    {
        name: 'Community Chest',
        top: 3*spaceSize,
        left: 0*spaceSize,
        id:18
    },
    {
        name: 'Tennessee Place',
        top: 2*spaceSize,
        left: 0*spaceSize,
        id:19,
        grouping:3,
        price:180,
        owner:null,
        houseCount:0,
        landPrice: [70,200,550,750,950],
        mortgage: 30
    },
    {
        name: 'New York Avenue',
        top: 1*spaceSize,
        left: 0*spaceSize,
        id:20,
        grouping:3,
        price:200,
        owner:null,
        houseCount:0,
        landPrice: [80,220,600,800,1000],
        mortgage: 30
    },
    {
        name: 'Free Parking',
        top: 0*spaceSize,
        left: 0*spaceSize,
        id:21
    },
    {
        name: 'Kentucky Avenue',
        top: 0*spaceSize,
        left: 1*spaceSize,
        id:22,
        grouping:4,
        price:220,
        owner:null,
        houseCount:0,
        landPrice: [90,250,700,875,1050],
        mortgage: 30
    },
    {
        name: 'Chance',
        top: 0*spaceSize,
        left: 2*spaceSize,
        id:23
    },
    {
        name: 'Indiana Avenue',
        top: 0*spaceSize,
        left: 3*spaceSize,
        id:24,
        grouping:4,
        price:220,
        owner:null,
        houseCount:0,
        landPrice: [90,250,700,875,1050],
        mortgage: 30
    },
    {
        name: 'Illinois Avenue',
        top: 0*spaceSize,
        left: 4*spaceSize,
        id:25,
        grouping:4,
        price:240,
        owner:null,
        houseCount:0,
        landPrice: [100,300,750,925,1100],
        mortgage: 30
    },
    {
        name: 'B&O Railroad',
        top: 0*spaceSize,
        left: 5*spaceSize,
        id:26,
        price:200,
        owner:null,
        mortgage: 30
    },
    {
        name: 'Atlantic Avenue',
        top: 0*spaceSize,
        left: 6*spaceSize,
        id:27,
        grouping:5,
        price:260,
        owner:null,
        houseCount:0,
        landPrice: [110,330,800,975,1150],
        mortgage: 30
    },
    {
        name: 'Ventnor Avenue',
        top: 0*spaceSize,
        left: 7*spaceSize,
        id:28,
        grouping:5,
        price:260,
        owner:null,
        houseCount:0,
        landPrice: [110,330,800,975,1150],
        mortgage: 30
    },
    {
        name: 'Water Works',
        top: 0*spaceSize,
        left: 8*spaceSize,
        id:29,
        price:150,
        owner:null,
        mortgage: 30
    },
    {
        name: 'Marvin Gardens',
        top: 0*spaceSize,
        left: 9*spaceSize,
        id:30,
        grouping:5,
        price:280,
        owner:null,
        houseCount:0,
        landPrice: [120,360,850,1025,1200],
        mortgage: 30
    },
    {
        name: 'Go To Jail',
        top: 0*spaceSize,
        left: 10*spaceSize,
        id:31
    },
    {
        name: 'Pacific Avenue',
        top: 1*spaceSize,
        left: 10*spaceSize,
        id:32,
        grouping:6,
        price:300,
        owner:null,
        houseCount:0,
        landPrice: [130,390,900,1100,1275],
        mortgage: 30
    },
    {
        name: 'North Carolina Avenue',
        top: 2*spaceSize,
        left: 10*spaceSize,
        id:33,
        grouping:6,
        price:300,
        owner:null,
        houseCount:0,
        landPrice: [130,390,900,1100,1275],
        mortgage: 30
    },
    {
        name: 'Community Chest',
        top: 3*spaceSize,
        left: 10*spaceSize,
        id:34
    },
    {
        name: 'Pennsylvania Avenue',
        top: 4*spaceSize,
        left: 10*spaceSize,
        id:35,
        grouping:6,
        price:320,
        owner:null,
        houseCount:0,
        landPrice: [450,1000,1200,1400],
        mortgage: 30
    },
    {
        name: 'Short Line',
        top: 5*spaceSize,
        left: 10*spaceSize,
        id:36,
        price:200,
        owner:null,
        mortgage: 30
    },
    {
        name: 'Chance',
        top: 6*spaceSize,
        left: 10*spaceSize,
        id:37
    },
    {
        name: 'Park Place',
        top: 7*spaceSize,
        left: 10*spaceSize,
        id:38,
        grouping:7,
        price:350,
        owner:null,
        houseCount:0,
        landPrice: [500,1100,1300,1500],
        mortgage: 30
    },
    {
        name: 'Luxury Tax',
        top: 8*spaceSize,
        left: 10*spaceSize,
        id:39
    },
    {
        name: 'Boardwalk',
        top: 9*spaceSize,
        left: 10*spaceSize,
        id:40,
        grouping:7,
        price:400,
        owner:null,
        houseCount:0,
        landPrice: [200,600,1400,1700,2000],
        mortgage: 30
    },
];