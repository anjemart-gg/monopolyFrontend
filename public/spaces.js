function createSquare(space){
    console.log(space);
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
    if(typeof(space.propertyGrouping) != 'undefined'){
        var divOrientation = 'height:30%; width:97%;';
        
        divText += '<div style=" border: 1px solid black; overflow: none;'+divOrientation+' background-color:'+groupingColors[space.propertyGrouping]+';"></div>'
    }
    divText += space.spaceName+'</div>';
    document.getElementById('body').innerHTML += divText;
    console.log(space.spaceName);
}

async function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, true );
    xmlHttp.send( null );
    return xmlHttp.responseText;
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

var request = new XMLHttpRequest()

request.open('GET', 'http://localhost:8765/getSpaceInfo', false)
request.onload = function () {
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {
    data.forEach((space) => {
        spaces.push(space);
    })
  } else {
    console.log('error')
  }
}

request.send();