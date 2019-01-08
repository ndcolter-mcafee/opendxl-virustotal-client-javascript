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

  // Create our request parameters object
  var requestParams = {
    resource: '7657fcb7d772448a6d8504e4b20168b8'
  }

  // Invoke 'file report' method on service
  virusTotalApiClient.fileRescan(
    function (error, fileRescanObject) {
      // Destroy the client - frees up resources so that the application
      // stops running
      client.destroy()
      if (error) {
        console.log('Error: ' + error.message)
      } else {
        // Print out the returned JSON object
        console.log(JSON.stringify(fileRescanObject, null, 2))
      }
    },
    requestParams
  )
})
