(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
      var cols=[{
        id:"DestinationCode",
        dataType:tableau.dataTypeEnum.string
      },
      {
        id:"EstimatedArrival",
        dataType:tableau.dataTypeEnum.string
      },
      {
        id:"Feature",
        dataType:tableau.dataTypeEnum.string
      },
      {
        id:"Latitude",
        dataType:tableau.dataTypeEnum.float
      },
      {
        id:"Longitude",
        dataType:tableau.dataTypeEnum.float
      }
    ]


        var tableSchema = {
            id: "busstatus",
            alias: "Live bus status",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
      $.ajax  ({
         url:'http://CORS-Anywhere.HerokuApp.com/http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?ServiceNo=10&BusStopCode=75009',

         type: "GET",
         crossOrigin:true,
         beforeSend: function(xhr){xhr.setRequestHeader('accept', 'application/json');
       xhr.setRequestHeader('AccountKey','RAGHPk3qTNC685iHir8V8w==');
     xhr.setRequestHeader('Access-Control-Allow-Origin',"*")},
         success: function(resp) {
           console.log(resp)
            gresp=resp;
           alert("resp")
           console.log(resp[0])
           // var feat = resp.features,
           //     tableData = [];
           //
           // // Iterate over the JSON object
           // for (var i = 0, len = feat.length; i < len; i++) {
           //     tableData.push({
           //         "id": feat[i].id,
           //         "mag": feat[i].properties.mag,
           //         "title": feat[i].properties.title,
           //         "lon": feat[i].geometry.coordinates[0],
           //         "lat": feat[i].geometry.coordinates[1]
           //     });
           // }
           //
           // table.appendRows(tableData);
           tabledata=[]
           console.log(resp.Services)
           console.log(resp.Services[0].NextBus)
           if(typeof(resp.Services[0].NextBus)=="object"){
             tabledata.push(resp.Services[0].NextBus)


           }
           if(typeof(resp.Services[0].NextBus1)=="object"){
             tabledata.push(resp.Services[0].NextBus1)
           }
           if(typeof(resp.Services[0].NextBus2)=="object"){
             tabledata.push(resp.Services[0].NextBus2)
           }
           console.log(tabledata)

           table.appendRows(tabledata);
           doneCallback();
       } }
      );
    }


    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Bus Info"; // This will be the data source name in Tableau
            tableau.submit();
             // This sends the connector object to Tableau
        });
        setTimeout(tableau.submit(),10000);
    });
})();
