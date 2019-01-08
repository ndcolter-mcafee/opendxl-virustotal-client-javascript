/* jshint esversion: 6 */
/* Node 4.9.1 (our minimum supported version, has basic const support */

// The DXL service type for the VirusTotal API
const SERVICE_TYPE = '/opendxl-virustotal/service/vtapi'

// The "file rescan" DXL request topic
const REQ_TOPIC_FILE_RESCAN = SERVICE_TYPE + '/file/rescan'
// The "file report" DXL request topic
const REQ_TOPIC_FILE_REPORT = SERVICE_TYPE + '/file/report'
// The "url scan" DXL request topic
const REQ_TOPIC_URL_SCAN = SERVICE_TYPE + '/url/scan'
// The "url report" DXL request topic
const REQ_TOPIC_URL_REPORT = SERVICE_TYPE + '/url/report'
// The "ip address report" DXL request topic
const REQ_TOPIC_IP_ADDRESS_REPORT = SERVICE_TYPE + '/ip-address/report'
// The "domain report" DXL request topic
const REQ_TOPIC_DOMAIN_REPORT = SERVICE_TYPE + '/domain/report'

// The resource request parameter
const PARAM_RESOURCE = 'resource'
// The URL request parameter
const PARAM_URL = 'url'
// The IP address request parameter
const PARAM_IP = 'ip'
// The domain request parameter
const PARAM_DOMAIN = 'domain'

// The all info request parameter
const PARAM_ALLINFO = 'allinfo'
// The period request parameter
const PARAM_PERIOD = 'period'
// The repeat request parameter
const PARAM_REPEAT = 'repeat'
// The notify url request parameter
const PARAM_NOTIFY_URL = 'notify_url'
// The notify changes only request parameter
const PARAM_NOTIFY_CHANGES_ONLY = 'notify_changes_only'
// The date request parameter
const PARAM_DATE = 'date'
// The scan request parameter
const PARAM_SCAN = 'scan'

const CLIENT_CONFIG_FILE = 'dxlclient.config'
const APP_CONFIG_FILE = 'dxlvtapiservice.config'

module.exports = {
  SERVICE_TYPE: SERVICE_TYPE,
  REQ_TOPIC_FILE_RESCAN: REQ_TOPIC_FILE_RESCAN,
  REQ_TOPIC_FILE_REPORT: REQ_TOPIC_FILE_REPORT,
  REQ_TOPIC_URL_SCAN: REQ_TOPIC_URL_SCAN,
  REQ_TOPIC_URL_REPORT: REQ_TOPIC_URL_REPORT,
  REQ_TOPIC_IP_ADDRESS_REPORT: REQ_TOPIC_IP_ADDRESS_REPORT,
  REQ_TOPIC_DOMAIN_REPORT: REQ_TOPIC_DOMAIN_REPORT,
  PARAM_RESOURCE: PARAM_RESOURCE,
  PARAM_URL: PARAM_URL,
  PARAM_IP: PARAM_IP,
  PARAM_DOMAIN: PARAM_DOMAIN,
  PARAM_ALLINFO: PARAM_ALLINFO,
  PARAM_PERIOD: PARAM_PERIOD,
  PARAM_REPEAT: PARAM_REPEAT,
  PARAM_NOTIFY_URL: PARAM_NOTIFY_URL,
  PARAM_NOTIFY_CHANGES_ONLY: PARAM_NOTIFY_CHANGES_ONLY,
  PARAM_DATE: PARAM_DATE,
  PARAM_SCAN: PARAM_SCAN,
  CLIENT_CONFIG_FILE: CLIENT_CONFIG_FILE,
  APP_CONFIG_FILE: APP_CONFIG_FILE
}
