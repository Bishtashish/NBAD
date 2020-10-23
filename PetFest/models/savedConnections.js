// $(window).on('load', () => {
//     const elem = document. getElementById('savedButton');
    
//     elem.setAttribute("disabled", "disabled");
//           elem.classList.add("disabled");
//     // elem.setAttribute("hover","disabled");
//     // elem.classList.remove("hover");
//   });

if( typeof window!=='undefined'){
window.onload = function() {
    document. getElementById('savedButton').disabled = true;
    // createTable(conList);
  };
}

  var conn1 = { connectionID: "Golden", connectionName: "22 Dec 2020", connectionTopic: "Joy", details:"", dateTime:"",hostName:"",image:""};

  var conn2 = { connectionID: "Akita", connectionName: "24 Dec 2020", connectionTopic: "Hima", details:"", dateTime:"",hostName:"",image:""};

  var conn3 = { connectionID: "Mastiff", connectionName: "24 Dec 2020", connectionTopic: "Tenzin", details:"", dateTime:"",hostName:"",image:""};

  var conn4 = { connectionID: "Beagle", connectionName: "28 Dec 2020", connectionTopic: "Ashish Bisht", details:"", dateTime:"",hostName:"",image:""};

  var conList = [conn1, conn2, conn3, conn4];


  function findConnection(conName) {

      const val = conList.find(item => item.name === conName);
  
      if (val === undefined) console.log("Error: Name not found.");
  
      else console.log(JSON.stringify(val));
  }
  
  function addConnection(conObject) {
  
      const val = conList.find(item => item.name === conObject.name);
  
  
      if (val !== undefined) console.log("Error: Object alreay exists.");
  
  
      else {
            conList.push(conObject);
          console.log(conObject.name)
      }
  
  }
  
  function removeConnection(conName) {
      const val = conList.find(item => item.name === conName);
  
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
  
  
  
      var val = conList.find(item => item.name === conObject.name);
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
  
    tableData.forEach(function(rowData) {
      var row = document.createElement('tr');
  
      rowData.forEach(function(cellData) {
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