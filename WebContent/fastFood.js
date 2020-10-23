
var bojangles = { name: "Bojangles", yearFounded: 1940, owner: "Bojangle's Owner" };
var chick = { name: "Chick-Fil-E", yearFounded: 1950, owner: "Chick Fil-E's Owner" };
var subway = { name: "Subway", yearFounded: 1960, owner: "Subway's Owner" };



const fastFoodObj = [bojangles, chick, subway];




export function findFastFood(nameOfFastFood) {
    // fastFoodObj.forEach(element =>{ const flag =element.name==nameOfFastFood return flag? element});

    for (const val in fastFoodObj) {
        if (val.name === nameOfFastFood) {
            console.log(val);
            return;
        }
        console.log("Error: Not found.")

    }


}

export function addFastFood(fastFoodObject) {

    for (const val in fastFoodObj) {
        if (val.name == fastFoodObject.name) {
            console.log("Error: Object alreay exists.")
            return;
        }
    }

    fastFoodObj.push(fastFoodObject);
    console.log(fastFoodObject.name)

}

export function removeFastFood(nameOfFastFood) {
    for (const val in fastFoodObj) {
        if (val.name === nameOfFastFood) {
            console.log("Removed object" + val)
            const index = array.indexOf(val);
            if (index > -1)
                array.splice(index, 1);
        }
        return;
    }
    console.log("Error: Name not found.")
    // fastFoodObj = fastFoodObj.filter(element => element.name !== nameOfFastFood.name);
}

export function editFastFood(fastFoodObject) {

    // fastFoodObj.forEach(element => element.name==fastFoodObject.name?  el=fastFoodObj;);
    for (const val in fastFoodObj) {
        if (val.name === fastFoodObj.name) {
            console.log("Old" + val);
            val = fastFoodObj;
            console.log("New" + val);
            return;
        }
    }
    console.log("Error: Object not found.")




}