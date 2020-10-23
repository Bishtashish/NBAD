
var bojangles = { name: "Bojangles", yearFounded: 1940, owner: "Bojangle's Owner" };
var chick = { name: "Chick-Fil-A", yearFounded: 1950, owner: "Chick Fil-E's Owner" };
var subway = { name: "Subway", yearFounded: 1960, owner: "Subway's Owner" };



var fastFoodObj = [bojangles, chick, subway];




function findFastFood(nameOfFastFood) {

    const val = fastFoodObj.find(item => item.name === nameOfFastFood);

    if (val === undefined) console.log("Error: Name not found.");

    else {
        // console.log(JSON.stringify(val));
        return val;
    }
}

function addFastFood(fastFoodObject) {

    const val = fastFoodObj.find(item => item.name === fastFoodObject.name);


    if (val !== undefined) console.log("Error: Object alreay exists.");


    else {
        fastFoodObj.push(fastFoodObject);
        console.log(fastFoodObject.name)
    }

}

function removeFastFood(nameOfFastFood) {
    const val = fastFoodObj.find(item => item.name === nameOfFastFood);

    if (val === undefined) console.log("Error: Name not found.");

    else {
        console.log(JSON.stringify(val))
        const index = fastFoodObj.indexOf(val);
        if (index > -1) fastFoodObj.splice(index, 1);
    }
    // fastFoodObj = fastFoodObj.filter(element => element.name !== nameOfFastFood.name);
}

function editFastFood(fastFoodObject) {

    // fastFoodObj.forEach(element => element.name==fastFoodObject.name?  el=fastFoodObj;);



    var val = fastFoodObj.find(item => item.name === fastFoodObject.name);
    if (val !== undefined) {
        console.log("Old " + JSON.stringify(val));
        const returnedTarget = Object.assign(val, fastFoodObject)
        // Splice


        // val = fastFoodObj;
        console.log("New " + JSON.stringify(returnedTarget));

    }
    else console.log("Error: Object not found.")

}

module.exports.addFastFood = addFastFood;
module.exports.removeFastFood = removeFastFood;
module.exports.findFastFood = findFastFood;
module.exports.editFastFood = editFastFood;
module.exports.objArray = fastFoodObj;
