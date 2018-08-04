(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
      var cols=[{
        id:"Type",
        dataType:tableau.dataTypeEnum.string
      },
      {
        id:"Message",
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
            id: "traffic",
            alias: "trafficstatus",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
      $.ajax  ({
         url:'http://CORS-Anywhere.HerokuApp.com/http://datamall2.mytransport.sg/ltaodataservice/TrafficIncidents',

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
           console.log(resp.value)

           for(i=0;i<resp.value.length;i++){
             tabledata.push(resp.value[i])
           }

           table.appendRows(tabledata);
           console.log(table)
           doneCallback();
       } }
      );
    }


    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Traffic Incident"; // This will be the data source name in Tableau
            tableau.submit();
             // This sends the connector object to Tableau
        });

    });
})();
