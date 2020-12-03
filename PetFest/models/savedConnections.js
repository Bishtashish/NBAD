// $(window).on('load', () => {
//     const elem = document. getElementById('savedButton');

//     elem.setAttribute("disabled", "disabled");
//           elem.classList.add("disabled");
//     // elem.setAttribute("hover","disabled");
//     // elem.classList.remove("hover");
//   });

var conn1 = {
  connectionID: "",
  connectionName: "Labradore, Retreiver",
  dateTime: "22 Dec 2020",
  connectionTopic: "Meetup",
  details: "About: The sweet-faced, lovable Labrador Retriever is America’s most popular dog breed.Labs are friendly, outgoing, and high-spirited companions who have more than enough affection to go around for a family looking for a medium-to-large dog.",
  hostName: "Joy",
  image: "/breed/Golden_Retriever.png"
};

var conn2 = {
  connectionID: "",
  connectionName: "Akita",
  dateTime: "24 Dec 2020",
  connectionTopic: "Meetup",
  details: "",
  hostName: "Hima",
  image: "/breed/Akita_Inu.png"
};

var conn3 = {
  connectionID: "",
  connectionName: "Mastiff",
  dateTime: "24 Dec 2020",
  connectionTopic: "Meetup",
  details: "",
  hostName: "Tenzin",
  image: "/breed/Saint_Bernard.png"
};

var conn4 = {
  connectionID: "",
  connectionName: "Beagle",
  dateTime: "28 Dec 2020",
  connectionTopic: "Meetup",
  details: "",
  hostName: "Ashish Bisht",
  image: "/breed/Beagle.png"
};

var conList = [conn1, conn2, conn3, conn4];




function findConnection(conName) {

  const val = conList.find(item => item.connectionName === conName);

  if (val === undefined) console.log("Error: Name not found.");

  else {
    // console.log(JSON.stringify(val));
    return val;
  }
}

function findConnection(conName, conTopic) {
  const val = conList.find(item => item.connectionName === conName && item.connectionTopic === conTopic);
  if (val === undefined) console.log("Error: Name with topic not found.");
  else {
    // console.log(JSON.stringify(val));
    return val;
  }
}

function addConnection(conObject) {

  const val = conList.find(item => item.connectionName === conObject.connectionName);
  if (val !== undefined) console.log("Error: Object alreay exists.");
  else {
    conList.push(conObject);
    console.log(conObject.connectionName)
  }

}

function removeConnection(conName) {
  const val = conList.find(item => item.connectionName === conName);
  if (val === undefined) console.log("Error: Name not found.");
  else {
    console.log(JSON.stringify(val))
    const index = conList.indexOf(val);
    if (index > -1) conList.splice(index, 1);
  }
  // fastFoodObj = fastFoodObj.filter(element => element.name !== nameOfFastFood.name);
}

function editConnection(conObject) {

  // fastFoodObj.forEach(element => element.name==fastFoodObject.name?  el=fastFoodObj;);



  var val = conList.find(item => item.connectionName === conObject.connectionName);
  if (val !== undefined) {
    console.log("Old " + JSON.stringify(val));
    const returnedTarget = Object.assign(val, conList)
    // Splice


    // val = fastFoodObj;
    console.log("New " + JSON.stringify(returnedTarget));

  }
  else console.log("Error: Object not found.")

}




function createTable(tableData) {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

  tableData.forEach(function (rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function (cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  document.body.appendChild(table);
}





module.exports.findConnection = findConnection;
module.exports.addConnection = addConnection;
module.exports.removeConnection = removeConnection;
module.exports.editConnection = editConnection;
module.exports.objArray = conList;