'use strict'

var inherits = require('inherits')
var moment = require('moment')
var dxl = require('@opendxl/dxl-client')
var Client = require('@opendxl/dxl-bootstrap').Client
var MessageUtils = require('@opendxl/dxl-bootstrap').MessageUtils
var VtApiClientConstants = require('./vtapi-client-constants')

/**
 * @classdesc Responsible for all communication with the Data Exchange Layer (DXL) fabric.
 * @external DxlClient
 * @see {@link https://opendxl.github.io/opendxl-client-javascript/jsdoc/Client.html}
 */

/**
 * @classdesc This client provides a high level wrapper for invoking calls to a
 * running OpenDXL VirusTotal API Service.
 *
 * @param {external:DxlClient} dxlClient - The DXL client to use for communication
 * with a running OpenDXL VirusTotal API Service.
 * @constructor
 */
function VirusTotalApiClient (dxlClient) {
  this._dxlClient = dxlClient

  /**
   * Adds the specified date parameter to the dictionary.
   * @param {Object} [reqDict] - The dictionary
   * @param {String} [paramName] - The name of the parameter
   * @param {Object} [paramValue] - The value for the parameter
   * @private
   */
  this._addDateParamByName = function (reqDict, paramName, paramValue) {
    reqDict[paramName] = paramValue instanceof Date ? moment(paramValue).format('YYYYMMDDHHmmss') : paramValue
  }

  /**
   * Adds the specified boolean parameter to the dictionary.
   * @param {Object} [reqDict] - The dictionary
   * @param {String} [paramName] - The name of the parameter
   * @param {Boolean} [paramValue] - The value for the parameter
   * @private
   */
  this._addBooleanParamByName = function (reqDict, paramName, paramValue) {
    if (paramValue !== undefined && paramValue !== null) {
      reqDict[paramName] = '1'
    }
  }

  /**
   * Adds the specified string parameter to the dictionary.
   * @param {Object} [reqDict] - The dictionary
   * @param {String} [paramName] - The name of the parameter
   * @param {String} [paramValue] - The value for the parameter
   * @private
   */
  this._addStringParamByName = function (reqDict, paramName, paramValue) {
    if (paramValue !== undefined && paramValue !== null) {
      reqDict[paramName] = paramValue.toString()
    }
  }

  /**
   * Adds the specified resource parameter to the dictionary.
   * @param {Object} [reqDict] - The dictionary
   * @param {String} [resource] - The resource value
   * @private
   */
  this._addResourceParam = function (reqDict, resource) {
    reqDict[VtApiClientConstants.PARAM_RESOURCE] = Array.isArray(resource) ? resource.join(',') : resource
  }

  /**
   * Adds the specified URL parameter to the dictionary.
   * @param {Object} [reqDict] - The dictionary
   * @param {String} [url] - The url value
   * @param {String} [paramName] - The name of the parameter
   * @private
   */
  this._addUrlParam = function (reqDict, url, paramName) {
    reqDict[paramName] = Array.isArray(url) ? url.join('\n') : url
  }

  /**
   * Adds the specified 'all info' parameter to the dictionary.
   * @param {Object} [reqDict] - The dictionary
   * @param {String} [allInfo] - The all info value
   * @private
   */
  this._addAllInfoParam = function (reqDict, allInfo) {
    this._addBooleanParamByName(reqDict, VtApiClientConstants.PARAM_ALLINFO, allInfo)
  }

  /**
   * Adds the specified 'notify changes only' parameter to the dictionary.
   * @param {Object} [reqDict] - The dictionary
   * @param {Boolean} [notifyChangesOnly] - The notify changes only value
   * @private
   */
  this._addNotifyChangesOnlyParam = function (reqDict, notifyChangesOnly) {
    this._addBooleanParamByName(
      reqDict,
      VtApiClientConstants.PARAM_NOTIFY_CHANGES_ONLY,
      notifyChangesOnly
    )
  }

  /**
   * Adds the specified period parameter to the dictionary.
   * @param {Object} [reqDict] - The dictionary
   * @param {Boolean} [period] - The period value
   * @private
   */
  this._addPeriodParam = function (reqDict, period) {
    this._addStringParamByName(reqDict, VtApiClientConstants.PARAM_PERIOD, period)
  }

  /**
   * Adds the specified repeat parameter to the dictionary.
   * @param {Object} [reqDict] - The dictionary
   * @param {Boolean} [repeat] - The repeat value
   * @private
   */
  this._addRepeatParam = function (reqDict, repeat) {
    this._addStringParamByName(reqDict, VtApiClientConstants.PARAM_REPEAT, repeat)
  }

  /**
   * Adds the specified 'notify URL' parameter to the dictionary.
   * @param {Object} [reqDict] - The dictionary
   * @param {Boolean} [notifyUrl] - The notify URL value
   * @private
   */
  this._addNotifyUrlParam = function (reqDict, notifyUrl) {
    this._addStringParamByName(reqDict, VtApiClientConstants.PARAM_NOTIFY_URL, notifyUrl)
  }

  /**
   * Adds the specified date parameter to the dictionary. The date parameter
   * should be provided as a String or a Date object.
   * @param {Object} [reqDict] - The dictionary
   * @param {Object} [date] - The date value
   * @private
   */
  this._addDateParam = function (reqDict, date) {
    this._addDateParamByName(reqDict, VtApiClientConstants.PARAM_DATE, date)
  }

  /**
   * Adds the specified scan parameter to the dictionary.
   * @param {Object} [reqDict] - The dictionary
   * @param {Boolean} [scan] - The scan value
   * @private
   */
  this._addScanParam = function (reqDict, scan) {
    this._addBooleanParamByName(reqDict, VtApiClientConstants.PARAM_SCAN, scan)
  }

  /**
   * Adds the specified ip address parameter to the dictionary.
   * @param {Object} [reqDict] - The dictionary
   * @param {String} [ip] - The ip address value
   * @private
   */
  this._addIpParam = function (reqDict, ip) {
    this._addStringParamByName(reqDict, VtApiClientConstants.PARAM_IP, ip)
  }

  /**
   * Adds the specified domain parameter to the dictionary.
   * @param {Object} [reqDict] - The dictionary
   * @param {String} [domain] - The domain value
   * @private
   */
  this._addDomainParam = function (reqDict, domain) {
    this._addStringParamByName(reqDict, VtApiClientConstants.PARAM_DOMAIN, domain)
  }

  /**
   * Invokes the VirusTotal DXL service.
   * @param {Object} [reqDict] - Dictionary containing request information
   * @param {String} [topic] - The VirusTotal DXL topic to invoke
   * @param {Function} [responseCallback] - Callback function to invoke
   *   with the results of the remote command.
   */
  this._invokeService = function (reqDict, topic, responseCallback) {
    // Create the DXL request message
    var request = new dxl.Request(topic)

    // Set the payload on the request message (Python dictionary to JSON payload)
    MessageUtils.objectToJsonPayload(request, reqDict)

    // Perform an asynchronous DXL request
    this._dxlClient.asyncRequest(request, function (error, response) {
      responseCallback(error, MessageUtils.jsonPayloadToObject(response))
    }
    )
  }

  Client.call(this, dxlClient)
}

inherits(VirusTotalApiClient, Client)

/**
 * Retrieves an existing file scan report for the specified file(s). See
 * {@link https://github.com/opendxl/opendxl-virustotal-service-javascript/wiki/Service-Methods#file-report|this page}
 * for more information.
 * @param {Function} [responseCallback] - Callback function to invoke
 *   with the results of the remote command.
 * @param {Object} [options] - Dictionary containing request information
 */
VirusTotalApiClient.prototype.fileReport = function (responseCallback, options) {
  var reqDict = {}
  this._addResourceParam(reqDict, options.resource)
  this._addAllInfoParam(reqDict, options.allInfo)

  // Change this to instead pass in responseCallback to invokeService
  return this._invokeService(reqDict, VtApiClientConstants.REQ_TOPIC_FILE_REPORT, responseCallback)
}

/**
 * Rescans existing files in VirusTotal's file store without resubmitting them. See
 * {@link https://github.com/opendxl/opendxl-virustotal-service-javascript/wiki/Service-Methods#file-rescan|this page}
 * for more information.
 * @param {Object} [options] - Dictionary containing request information
 * @param {Function} [responseCallback] - Callback function to invoke
 *   with the results of the remote command.
 */
VirusTotalApiClient.prototype.fileRescan = function (responseCallback, options) {
  var reqDict = {}
  this._addResourceParam(reqDict, options.resource)
  this._addDateParam(reqDict, options.date)
  this._addPeriodParam(reqDict, options.period)
  this._addRepeatParam(reqDict, options.repeat)
  this._addNotifyUrlParam(reqDict, options.notify_url)
  this._addNotifyChangesOnlyParam(reqDict, options.notify_changes_only)

  return this._invokeService(reqDict, VtApiClientConstants.REQ_TOPIC_FILE_RESCAN, responseCallback)
}

/**
 * Retrieves an existing scan report for the specified URL(s). See
 * {@link https://github.com/opendxl/opendxl-virustotal-service-javascript/wiki/Service-Methods#url-report|this page}
 * for more information.
 * @param {Object} [options] - Dictionary containing request information
 * @param {Function} [responseCallback] - Callback function to invoke
 *   with the results of the remote command.
 */
VirusTotalApiClient.prototype.urlReport = function (responseCallback, options) {
  var reqDict = {}
  this._addUrlParam(reqDict, options.resource, VtApiClientConstants.PARAM_RESOURCE)
  this._addScanParam(reqDict, options.scan, VtApiClientConstants.PARAM_SCAN)
  this._addAllInfoParam(reqDict, options.allInfo, VtApiClientConstants.PARAM_ALLINFO)

  return this._invokeService(
    reqDict,
    VtApiClientConstants
      .REQ_TOPIC_URL_REPORT,
    responseCallback
  )
}

/**
 * Submits a URL for scanning. See
 * {@link https://github.com/opendxl/opendxl-virustotal-service-javascript/wiki/Service-Methods#url-scan|this page}
 * for more information.
 * @param {Object} [url] - The URL to be scanned. Multiple URLs can be specified via a
 JavaScript Array.
 * @param {Function} [responseCallback] - Callback function to invoke
 *   with the results of the remote command.
 */
VirusTotalApiClient.prototype.urlScan = function (responseCallback, url) {
  var reqDict = {}
  this._addUrlParam(reqDict, url, VtApiClientConstants.PARAM_URL)

  return this._invokeService(
    reqDict,
    VtApiClientConstants.REQ_TOPIC_URL_SCAN,
    responseCallback
  )
}

/**
 * Retrieves a report on the specified IP address. See
 * {@link https://github.com/opendxl/opendxl-virustotal-service-javascript/wiki/Service-Methods#ip-address-report|this page}
 * for more information.
 * @param {String} [ip] - A valid IPv4 address in dotted quad notation
 * @param {Function} [responseCallback] - Callback function to invoke
 *   with the results of the remote command.
 */
VirusTotalApiClient.prototype.ipReport = function (responseCallback, ip) {
  var reqDict = {}
  this._addIpParam(reqDict, ip, VtApiClientConstants.PARAM_IP)

  return this._invokeService(
    reqDict,
    VtApiClientConstants.REQ_TOPIC_IP_ADDRESS_REPORT,
    responseCallback
  )
}

/**
 * Retrieves a report on the specified domain. See
 * {@link https://github.com/opendxl/opendxl-virustotal-service-javascript/wiki/Service-Methods#domain-report|this page}
 * for more information.
 * @param {String} [domain] - A domain name
 * @param {Function} [responseCallback] - Callback function to invoke
 *   with the results of the remote command.
 */
VirusTotalApiClient.prototype.domainReport = function (responseCallback, domain) {
  var reqDict = {}
  this._addDomainParam(reqDict, domain)

  return this._invokeService(
    reqDict,
    VtApiClientConstants.REQ_TOPIC_DOMAIN_REPORT,
    responseCallback
  )
}

module.exports = VirusTotalApiClient
