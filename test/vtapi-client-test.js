'use strict'

var path = require('path')
var childProcess = require('child_process')
var assert = require('chai').assert
var common = require('../sample/common')
var dxl = require('@opendxl/dxl-client')
var MessageUtils = require('@opendxl/dxl-bootstrap').MessageUtils
var TestConstants = require('./test-constants')
var MockVtApiService = require('./mock-vtapiservice')

var SAMPLE_DIR = path.join(__dirname, '/../sample')

var DEFAULT_TIMEOUT = 5000

function getJsonStringFromStdout (stdout) {
  return stdout.substring(
    stdout.indexOf('{'),
    stdout.length - 1
  )
}

function sampleTestSetup (dxlClient) {
  var mockService = new MockVtApiService(dxlClient)

  return {
    mockService: mockService
  }
}

function sampleTestTeardown (sampleTestObjects) {
  setTimeout(
    function () {
      sampleTestObjects.mockService.destroy()
    },
    DEFAULT_TIMEOUT
  )
}

function runSample (sampleFilePath, expectedResponsePayload, done) {
  childProcess.exec(
    path.join('node ' + sampleFilePath),
    function (error, stdout, stderr) {
      var printedJson = getJsonStringFromStdout(stdout)

      // This conversion will throw a Syntax Error if the JSON string is invalid,
      // causing the calling test to fail.
      try {
        var parsedJson = MessageUtils.jsonToObject(printedJson)

        assert.deepEqual(parsedJson, expectedResponsePayload)
        assert.equal(stderr, '')
        assert.equal(error, null)

        // Allow DXL fabric to unregister service.
        // Without this, timing issues can cause service requests made in subsequent
        // tests to be directed to this (inactive) service instance.
        setTimeout(function () {
          done()
        }, DEFAULT_TIMEOUT)
      } catch (e) {
        console.log('Error converting stdout substring to JSON:\n' + stdout)
        throw (e)
      }
    })
}

describe('VirusTotalApiClient Samples', function () {
  this.timeout(30000)

  it('should run the Domain Report sample and log expected output', function (done) {
    var config = dxl.Config.createDxlConfigFromFile(common.CONFIG_FILE)
    var dxlClient = new dxl.Client(config)
    var sampleTestObjects = sampleTestSetup(dxlClient)

    sampleTestObjects.mockService.run(function () {
      runSample(
        path.join(SAMPLE_DIR + '/basic/basic-domain-report-example.js'),
        TestConstants.DOMAIN_REPORT_PAYLOAD,
        done
      )

      sampleTestTeardown(sampleTestObjects)
    })
  })

  it('should run the File Report sample and log expected output', function (done) {
    var config = dxl.Config.createDxlConfigFromFile(common.CONFIG_FILE)
    var dxlClient = new dxl.Client(config)
    var sampleTestObjects = sampleTestSetup(dxlClient)

    sampleTestObjects.mockService.run(function () {
      runSample(
        path.join(SAMPLE_DIR + '/basic/basic-file-report-example.js'),
        TestConstants.FILE_REPORT_PAYLOAD,
        done
      )

      sampleTestTeardown(sampleTestObjects)
    })
  })

  it('should run the File Rescan sample and log expected output', function (done) {
    var config = dxl.Config.createDxlConfigFromFile(common.CONFIG_FILE)
    var dxlClient = new dxl.Client(config)
    var sampleTestObjects = sampleTestSetup(dxlClient)

    sampleTestObjects.mockService.run(function () {
      runSample(
        path.join(SAMPLE_DIR + '/basic/basic-file-rescan-example.js'),
        TestConstants.FILE_RESCAN_PAYLOAD,
        done
      )

      sampleTestTeardown(sampleTestObjects)
    })
  })

  it('should run the IP Address Report sample and log expected output', function (done) {
    var config = dxl.Config.createDxlConfigFromFile(common.CONFIG_FILE)
    var dxlClient = new dxl.Client(config)
    var sampleTestObjects = sampleTestSetup(dxlClient)

    sampleTestObjects.mockService.run(function () {
      runSample(
        path.join(SAMPLE_DIR + '/basic/basic-ip-address-report-example.js'),
        TestConstants.IP_REPORT_PAYLOAD,
        done
      )

      sampleTestTeardown(sampleTestObjects)
    })
  })

  it('should run the URL Report sample and log expected output', function (done) {
    var config = dxl.Config.createDxlConfigFromFile(common.CONFIG_FILE)
    var dxlClient = new dxl.Client(config)
    var sampleTestObjects = sampleTestSetup(dxlClient)

    sampleTestObjects.mockService.run(function () {
      runSample(
        path.join(SAMPLE_DIR + '/basic/basic-url-report-example.js'),
        TestConstants.URL_REPORT_PAYLOAD,
        done
      )

      sampleTestTeardown(sampleTestObjects)
    })
  })

  it('should run the URL Scan sample and log expected output', function (done) {
    var config = dxl.Config.createDxlConfigFromFile(common.CONFIG_FILE)
    var dxlClient = new dxl.Client(config)
    var sampleTestObjects = sampleTestSetup(dxlClient)

    sampleTestObjects.mockService.run(function () {
      runSample(
        path.join(SAMPLE_DIR + '/basic/basic-url-scan-example.js'),
        TestConstants.URL_SCAN_PAYLOAD,
        done
      )

      sampleTestTeardown(sampleTestObjects)
    })
  })
})
