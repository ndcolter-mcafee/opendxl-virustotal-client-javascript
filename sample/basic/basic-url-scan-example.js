'use strict'

var common = require('../common')
var dxl = common.require('@opendxl/dxl-client')
// var VirusTotalApiClient = require('@opendxl/dxl-vtapi-client').VirusTotalApiClient
var VirusTotalApiClient = require('./../..').VirusTotalApiClient

// Create our DXL Client to send requests
var config = dxl.Config.createDxlConfigFromFile(common.CONFIG_FILE)
var client = new dxl.Client(config)

client.connect(function () {
  // Create the VirusTotal client
  var virusTotalApiClient = new VirusTotalApiClient(client)

  // Invoke 'url scan' method on service
  virusTotalApiClient.urlScan(
    function (error, urlScanObject) {
      // Destroy the client - frees up resources so that the application
      // stops running
      client.destroy()
      if (error) {
        console.log('Error: ' + error.message)
      } else {
        // Print out the returned JSON object
        console.log(JSON.stringify(urlScanObject, null, 2))
      }
    },
    'http://www.virustotal.com'
  )
})
