var addConnection = require('./savedConnections.js').addConnection;
var removeConnection = require('./savedConnections.js').removeConnection;


var yesButton = document.getElementById('yesButton')
if(yesButton.click)
 var obj = { name: "Labradore", eventDate: "28 Dec 2020", host: "Ashish Bisht", image:"" };
 addConnection(obj);