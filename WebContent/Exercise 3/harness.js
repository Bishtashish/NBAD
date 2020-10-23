var addFastFood = require('./fastFood.js').addFastFood;
var removeFastFood = require('./fastFood.js').removeFastFood;
var findFastFood = require('./fastFood.js').findFastFood;
var editFastFood = require('./fastFood.js').editFastFood;





findFastFood("Subway");



findFastFood('Walmart');

var wendys = {name:"Wendys", yearFounded:1970, owner:"Wendy's owner"};



addFastFood(wendys);

var subway = {name:"Subway", yearFounded:1960, owner:"Subway's Owner"};




addFastFood(subway);




removeFastFood('Bojangles');




removeFastFood('Wallmart');


var chick = {name:"Chick-Fil-E", yearFounded:1950, owner:"Chick Fil-E's New Owner"};




editFastFood(chick);


var wallmart = {name:"Wallmart", yearFounded:1950, owner:"Wallmart New Owner"};




editFastFood(wallmart)