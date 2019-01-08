This sample invokes and displays the results of the VirusTotal "File Report" API call 
via the VirusTotal OpenDXL JavaScript service. The "Domain Report" provided by VirusTotal includes
condensed information about recent activity and contextual data for the domain provided in 
the request.

### Prerequisites

* The samples configuration step has been completed (see {@tutorial samples}).


### Running

To run this sample execute the ``sample/basic/basic-file-report-example.js``
script as follows:

The output should appear similar to the following:

```
Connected to: 10.10.10.10:8883
Client received response payload: 
{
    "md5": "7657fcb7d772448a6d8504e4b20168b8",
    "permalink": "https://www.virustotal.com/file/54bc950d46a0d1aa72048a17c8275743209e6c17bdacfc4cb9601c9ce3ec9a71/analysis/1543943305/",
    "positives": 64,
    "resource": "7657fcb7d772448a6d8504e4b20168b8",
    "response_code": 1,
    "scan_date": "2018-12-04 17:08:25",
    "scan_id": "54bc950d46a0d1aa72048a17c8275743209e6c17bdacfc4cb9601c9ce3ec9a71-1543943305",
    
    .
    .
    .

    "total": 69,
    "verbose_msg": "Scan finished, information embedded"
}
...
```

### Details

The majority of the sample code is shown below:

```js
// Create our DXL Client to send requests
var config = dxl.Config.createDxlConfigFromFile(common.CONFIG_FILE)
var dxlClient = new dxl.Client(config)

dxlClient.connect(function () {
  sendDomainReportRequest(dxlClient)
})
```

```js
// The function we will be calling to send the DXL Request to the
// OpenDXL VirusTotal API Service
function sendFileReportRequest(client) {

  var requestTopic = "/opendxl-virustotal/service/vtapi/file/report"

  var request = new dxl.Request(requestTopic)

  var payloadObj = {
    "resource": "7657fcb7d772448a6d8504e4b20168b8"
  }

  MessageUtils.objectToJsonPayload(request, payloadObj)

  client.asyncRequest(request,
    function (error, response) {
      if (error) {
        console.log('Request error: "' + error.message + '"')
      } else {

        // Parse the JSON Object
        var jsonObject = MessageUtils.jsonPayloadToObject(response)

        // Pretty-print the parsed JSON object
        console.log('Client received response payload: \n' +
          MessageUtils.objectToJson(jsonObject, true)
        )
      }

      // Because this is a sample, we will destroy the client after one
      // use. For a real application, the client should exist as long as
      // the application will be sending/receiving messages over DXL.
      client.destroy()
    })
}
```

Once a connection is established to the DXL fabric, the callback function
supplied to the DXL client instance's
[connect()](https://opendxl.github.io/opendxl-client-javascript/jsdoc/Client.html#connect)
method will be invoked. From within the callback function, the sample calls a function to
create a DXL request, populate the payload, and send the request asynchronously to the 
listening VirusTotal OpenDXL JavaScript service.

The service will use the parameters contained in the request to send a request to the 
VirusTotal RESTful interface via HTTP request, and receive the HTTP response. That HTTP
response is that packaged into a DXL Response message corresponding to the original request
and sent back to the invoking client (this sample).
