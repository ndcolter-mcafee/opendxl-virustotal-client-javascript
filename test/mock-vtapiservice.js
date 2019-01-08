'use strict'

var common = require('../sample/common')
var dxl = common.require('@opendxl/dxl-client')
var MessageUtils = require('@opendxl/dxl-bootstrap').MessageUtils
var VtApiClientConstants = require('../lib/vtapi-client-constants')
var TestConstants = require('./test-constants')

function MockVtApiService (dxlClient) {
  this._dxlClient = dxlClient

  function _chooseExpectedResponsePayload (topic) {
    var payload =
      topic === VtApiClientConstants.REQ_TOPIC_DOMAIN_REPORT
        ? TestConstants.DOMAIN_REPORT_PAYLOAD
        : topic === VtApiClientConstants.REQ_TOPIC_FILE_REPORT
          ? TestConstants.FILE_REPORT_PAYLOAD
          : topic === VtApiClientConstants.REQ_TOPIC_FILE_RESCAN
            ? TestConstants.FILE_RESCAN_PAYLOAD
            : topic === VtApiClientConstants.REQ_TOPIC_URL_REPORT
              ? TestConstants.URL_REPORT_PAYLOAD
              : topic === VtApiClientConstants.REQ_TOPIC_URL_SCAN
                ? TestConstants.URL_SCAN_PAYLOAD
                : topic === VtApiClientConstants.REQ_TOPIC_IP_ADDRESS_REPORT
                  ? TestConstants.IP_REPORT_PAYLOAD
                  : 'Error, unknown topic: ' + topic

    return payload
  }

  this._mockVtApiServiceRequestCallback = function (request, requiredParams, dxlClient) {
    try {
      console.log('Service received request payload: ' +
        request.payload.toString()
      )

      var params = MessageUtils.jsonPayloadToObject(request)

      for (var required in requiredParams) {
        if (requiredParams.hasOwnProperty(required)) {
          if (!(requiredParams[required] in params)) {
            throw new Error('Required parameter not specified: ' + requiredParams[required])
          }
        }
      }

      var response = new dxl.Response(request)
      MessageUtils.objectToJsonPayload(
        response,
        _chooseExpectedResponsePayload(request.destinationTopic)
      )
      dxlClient.sendResponse(response)
    } catch (ex) {
      console.log("Error handling request - '" + ex.message.toString() + "'")

      var errorResponse = new dxl.ErrorResponse(request, 0, MessageUtils.encode(ex.message))
      dxlClient.sendResponse(errorResponse)
    }

    dxlClient.destroy()
  }
}

MockVtApiService.prototype.run = function (callback) {
  var that = this

  // Connect to the fabric, supplying a callback function which is invoked
  // when the connection has been established
  this._dxlClient.connect(function () {
    // Create service registration object
    var serviceRegInfo = new dxl.ServiceRegistrationInfo(
      that._dxlClient,
      VtApiClientConstants.SERVICE_TYPE
    )

    serviceRegInfo.addTopic(
      VtApiClientConstants.REQ_TOPIC_DOMAIN_REPORT, function (request) {
        that._mockVtApiServiceRequestCallback(
          request,
          [VtApiClientConstants.PARAM_DOMAIN],
          that._dxlClient)
      }
    )
    serviceRegInfo.addTopic(
      VtApiClientConstants.REQ_TOPIC_FILE_REPORT, function (request) {
        that._mockVtApiServiceRequestCallback(
          request,
          [VtApiClientConstants.PARAM_RESOURCE],
          that._dxlClient)
      }
    )
    serviceRegInfo.addTopic(
      VtApiClientConstants.REQ_TOPIC_FILE_RESCAN, function (request) {
        that._mockVtApiServiceRequestCallback(
          request,
          [VtApiClientConstants.PARAM_RESOURCE],
          that._dxlClient)
      }
    )
    serviceRegInfo.addTopic(
      VtApiClientConstants.REQ_TOPIC_URL_REPORT, function (request) {
        that._mockVtApiServiceRequestCallback(
          request,
          [VtApiClientConstants.PARAM_RESOURCE],
          that._dxlClient)
      }
    )
    serviceRegInfo.addTopic(
      VtApiClientConstants.REQ_TOPIC_URL_SCAN, function (request) {
        that._mockVtApiServiceRequestCallback(
          request,
          [VtApiClientConstants.PARAM_URL],
          that._dxlClient)
      }
    )
    serviceRegInfo.addTopic(
      VtApiClientConstants.REQ_TOPIC_IP_ADDRESS_REPORT, function (request) {
        that._mockVtApiServiceRequestCallback(
          request,
          [VtApiClientConstants.PARAM_IP],
          that._dxlClient)
      }
    )

    that._dxlClient.registerServiceAsync(
      serviceRegInfo,
      function (error) {
        if (error) {
          that._dxlClient.destroy()
          console.log('Error registering service: ' + error.message)
        }
      }
    )

    callback()
  })
}

MockVtApiService.prototype.destroy = function (callback) {
  if (this._dxlClient) {
    this._dxlClient.destroy(callback)
  }
}

module.exports = MockVtApiService
