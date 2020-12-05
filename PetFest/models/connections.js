// $(window).on('load', () => {
//       const elem = document. getElementById('connectionButton');
//       document. getElementById('connectionButton').disabled = true;
//       elem.setAttribute("disabled", "disabled");
//             elem.classList.add("disabled");
//       elem.setAttribute("hover","disabled");
//       // elem.classList.remove("hover");
    
//   });
if( typeof window!=='undefined'){
  window.onload = function() {
      document. getElementsByClassName('connectionButton').disabled = true;
      // createTable(conList);
    };
  }
  window.addEventListener( "pageshow", function ( event ) {
    var historyTraversal = event.persisted || 
                           ( typeof window.performance != "undefined" && 
                                window.performance.navigation.type === 2 );
    if ( historyTraversal ) {
      // Handle page restore.
      window.location.reload();
    }
  });