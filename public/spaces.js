function createSquare(space){
    if(space.location < 11){
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
    var divText = '<div id="'+space.location+'" style="'+rotationText+'border:1px solid black;position:absolute;height:'+spaceSize+'px;width:'
        +spaceSize+'px;top:'+space.topPos*spaceSize+'px;left:'+space.leftPos*spaceSize+'px;overflow-wrap: break-word; font-size:12px;text-align: center;">';
    if(space.propertyGrouping != null){
        var divOrientation = 'height:30%; width:97%;';
        
        divText += '<div style=" border: 1px solid black; overflow: none;'+divOrientation+' background-color:'+groupingColors[space.propertyGrouping]+';"></div>'
    }

    divText += space.spaceName+'</div>';
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
var spaces = [];

let content = {
    "query" : `{
        getSpaces(boardGroup: 1){
          id
          spaceName
          price
          owner
          houseCount
          hotelCount
          landPrice
          houseMultiplier
          hotelMultiplier
          mortgageValue
          propertyGrouping
          leftPos
          topPos
          boardGroup
          location
        }
      }
    `
    }
    let body = JSON.stringify(content);


function getBoardData() {
    return fetch('http://localhost:8765/graphql', {
        method: 'post',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: body
    })
    .then(response => response.json())
    .then(response => {
        response.data.getSpaces.forEach(space => {
            console.log(space);
            spaces.push(space);
        });
    });
}