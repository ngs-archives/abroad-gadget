   gadgets.util.registerOnLoadHandler(requestMyData);
   var htmlout = "";
   var me = null;

   var comments = [];

   function populateMyAppData() {
     var req = opensocial.newDataRequest();
     var data1 = Math.random() * 5;
     var data2 = Math.random() * 100;
     var data3 = new Date().getTime();
     req.add(req.newUpdatePersonAppDataRequest("VIEWER", "AppField1", data1)) + "<br />";
     req.add(req.newUpdatePersonAppDataRequest("VIEWER", "AppField2", data2)) + "<br />";
     req.add(req.newUpdatePersonAppDataRequest("VIEWER", "AppField3", data3)) + "<br />";
     req.send(handlePopulateMyAppData);
   }

   function handlePopulateMyAppData(data) {
     if (data.hadError()) {
       htmlout += data.getErrorMessage();
     }
     requestMyData();
   }
   
   function requestMyData() {
     var req = opensocial.newDataRequest();
     var fields = [ "AppField1", "AppField2", "AppField3","Comment" ];
     req.add(req.newFetchPersonRequest(opensocial.IdSpec.PersonId.VIEWER), "viewer");
     var idspec = opensocial.newIdSpec({ "userId" : "VIEWER" });
     req.add(req.newFetchPersonAppDataRequest(idspec, fields), "viewer_data");
     req.send(handleRequestMyData);
   }

   function handleRequestMyData(data) {
     var mydata = data.get("viewer_data");
     var viewer = data.get("viewer");
     me = viewer.getData();

     if (mydata.hadError()) {
       htmlout += data.getErrorMessage();
       return;
     }
     // Do something with the returned data - note the getData call
     doSomethingWithMyData(mydata.getData());
   }

   function doSomethingWithMyData(data) {
     var mydata = data[me.getId()];
     var div = document.getElementById('content_div');
     htmlout +=  mydata["Comment"] + "[" + me.getDisplayName() + "] " + "<hr />";
     div.innerHTML = htmlout;
   }

function putMessage(comment){

  var req = opensocial.newDataRequest();
  req.add(req.newUpdatePersonAppDataRequest("VIEWER", "Comment", comment)) + "<br />";
  req.send(handlePutMessage);
  $('status').show();

  function handlePutMessage(data){
    if (data.hadError()) {
      alert(data.getErrorMessage());
    }
    $('status').hide();
  }

  requestMyData()
}

