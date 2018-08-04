function bus_data_provider(){
  return bus_data={"188_1":[
,44009
,44461
,44451
,44441
,44121
,44159
,44169
,43529
,43641
,43831
,43491
,43481
,43471
,43461
,43401
,43321
,43371
,43699
,28629
,28631
,28641
,28651
,28049
,28039
,28029
,28019
,20109
,17051
,20019
,17149
,17139
,17191
,16159
,16149
,16139
,16089
,16079
,16069
,16059
,16049
,16039
,16029
,16019
,16209
,15229
,15219
,15209
,15199
,15169
,15159
,15149
,14189
,14179
,14169
,14159
,14139
,14009],
'188_2':[
,14009
,14131
,14151
,14161
,14171
,15141
,15151
,15161
,15191
,15201
,15221
,16201
,16011
,16021
,16031
,16041
,16051
,16061
,16071
,16081
,16131
,16141
,16151
,17121
,17131
,17141
,17059
,20101
,28011
,28021
,28031
,28041
,28659
,28649
,28639
,28621
,43691
,43379
,43329
,43409
,43469
,43479
,43489
,43499
,43839
,43649
,43521
,44161
,44151
,44129
,44449
,44459
,44469
,44009]
}
}


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
        dataType:tableau.dataTypeEnum.string
      },
      {
        id:"Longitude",
        dataType:tableau.dataTypeEnum.string
      },
      {
        id:"serviceNo",
        dataType:tableau.dataTypeEnum.string
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
    bus_data=bus_data_provider()
    console.log(bus_data)
    route=188
    route_1=bus_data[""+route+"_"+1]
    route_2=bus_data[""+route+"_"+2]
    tabledata=[]
    myConnector.getData = function(table, doneCallback) {
      for(i in route_1){
        console.log(route_1[i])
        $.ajax  ({
           url:'http://CORS-Anywhere.HerokuApp.com/http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?ServiceNo=188&BusStopCode='+route_1[i]+'',
           type: "GET",
           crossOrigin:true,
           beforeSend: function(xhr){xhr.setRequestHeader('accept', 'application/json');
         xhr.setRequestHeader('AccountKey','RAGHPk3qTNC685iHir8V8w==');
       xhr.setRequestHeader('Access-Control-Allow-Origin',"*")},
           success: function(resp) {
             console.log(resp)
              gresp=resp;
             console.log("resp")
             console.log(resp[0])
             console.log(resp.Services)
             console.log(resp.Services[0].NextBus)
             if(typeof(resp.Services[0].NextBus)=="object"){
               obj=resp.Services[0].NextBus
               obj["serviceNo"]=route;
               tabledata.push(resp.Services[0].NextBus)
               console.log("inside")
               console.log(tabledata.length)
               if(tabledata.length==(route_1.length-1)){
                 for(i=0;i<1000;i++){
                   console.log("waiting")
                 }
                 console.log(tabledata)
                 table.appendRows(tabledata);
                 console.log(table)
                 doneCallback();
               }
           }
             //console.log(tabledata)

         } });

      }




    }



    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Bus Info"; // This will be the data source name in Tableau
            tableau.submit();
             // This sends the connector object to Tableau
        });

    });
})();
