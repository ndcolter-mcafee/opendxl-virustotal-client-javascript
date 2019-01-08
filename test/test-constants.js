const EXPECTED_API_KEY = '123abc'

const DOMAIN_REPORT_PAYLOAD = {
  'BitDefender category': 'parked',
  'undetected_referrer_samples': [
    {
      'date': '2018-03-04 16:38:06',
      'positives': 0,
      'total': 66,
      'sha256': 'ce08cf22949b6b6fcd4e61854ce810a4f9ee04529340dd077fa354d759dc7a95'
    }
  ],
  'whois_timestamp': 1539808047,
  'detected_downloaded_samples': [
    {
      'date': '2013-06-20 18:51:30',
      'positives': 2,
      'total': 46,
      'sha256': 'cd8553d9b24574467f381d13c7e0e1eb1e58d677b9484bd05b9c690377813e54'
    }
  ],
  'detected_referrer_samples': [],
  'Webutation domain info': {
    'Safety score': 40,
    'Adult content': 'yes',
    'Verdict': 'malicious'
  },
  'undetected_downloaded_samples': [
    {
      'date': '2018-01-14 22:34:24',
      'positives': 0,
      'total': 70,
      'sha256': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    }
  ],
  'resolutions': [
    {
      'last_resolved': '2018-09-03 10:58:50',
      'ip_address': '185.53.177.31'
    }
  ],
  'subdomains': [
    'www.027.ru',
    'test.027.ru'
  ],
  'categories': [
    'parked',
    'uncategorized'
  ],
  'domain_siblings': [],
  'undetected_urls': [],
  'whois': 'domain: 027.RUnnserver: ns1.nevstruev.ru.nnserver: ns2.nevstruev.ru.nstate: REGISTERED, DELEGATED, VERIFIEDnregistrar: RU-CENTER-RUncreated: 2005-12-08T21:00:00Znpaid-till: 2018-12-08T21:00:00Znsource: TCInLast updated on 2018-10-17T20:26:33Z',
  'response_code': 1,
  'Forcepoint ThreatSeeker category': 'uncategorized',
  'verbose_msg': 'Domain found in dataset',
  'Websense ThreatSeeker category': 'uncategorized',
  'detected_urls': [
    {
      'url': 'http://027.ru/index.html',
      'positives': 2,
      'total': 62,
      'scan_date': '2015-02-18 08:54:52'
    }
  ],
  'Dr.Web category': 'known infection source'
}

const FILE_REPORT_PAYLOAD = {
  'scans': {
    'Bkav': {
      'detected': true,
      'version': '1.3.0.9899',
      'result': 'W32.ZeustrackerZS.Trojan',
      'update': '20181116'
    },
    'MicroWorld-eScan': {
      'detected': true,
      'version': '14.0.297.0',
      'result': 'Gen:Variant.Kazy.8782',
      'update': '20181118'
    }
  },
  'scan_id': '54bc950d46a0d1aa72048a17c8275743209e6c17bdacfc4cb9601c9ce3ec9a71-1542545862',
  'sha1': '84c7201f7e59cb416280fd69a2e7f2e349ec8242',
  'resource': '7657fcb7d772448a6d8504e4b20168b8',
  'response_code': 1,
  'scan_date': '2018-11-18 12:57:42',
  'permalink': 'https://www.virustotal.com/file/54bc950d46a0d1aa72048a17c8275743209e6c17bdacfc4cb9601c9ce3ec9a71/analysis/1542545862/',
  'verbose_msg': 'Scan finished, information embedded',
  'total': 68,
  'positives': 62,
  'sha256': '54bc950d46a0d1aa72048a17c8275743209e6c17bdacfc4cb9601c9ce3ec9a71',
  'md5': '7657fcb7d772448a6d8504e4b20168b8'
}

const FILE_RESCAN_PAYLOAD = {
  'permalink': 'https://www.virustotal.com/file/54bc950d46a0d1aa72048a17c8275743209e6c17bdacfc4cb9601c9ce3ec9a71/analysis/1542652000/',
  'response_code': 1,
  'sha256': '54bc950d46a0d1aa72048a17c8275743209e6c17bdacfc4cb9601c9ce3ec9a71',
  'resource': '7657fcb7d772448a6d8504e4b20168b8',
  'scan_id': '54bc950d46a0d1aa72048a17c8275743209e6c17bdacfc4cb9601c9ce3ec9a71-1542652000'
}

const IP_REPORT_PAYLOAD = {
  'undetected_urls': [
    [
      'http://www.old.ecours.ru/econews/upload-files/kartinki/dictionary512-300x300.jpg',
      '6300ec6b783676a392ce75515104b52d725ecea9ff7c73e2dcbff5dcb11a5df2',
      0,
      69,
      '2018-11-19 14:57:02'
    ]
  ],
  'undetected_downloaded_samples': [{
    'date': '2018-06-19 17:07:28',
    'positives': 0,
    'total': 71,
    'sha256': 'e994c76ad99e603b35399ce2ad194ce02f1eb1798574095e0cd8d8acc4ec49c6'
  }],
  'whois': 'Last updated on 2018-11-10T03:11:34Z',
  'whois_timestamp': 1541819686,
  'country': 'RU',
  'response_code': 1,
  'as_owner': '.masterhost autonomous system',
  'detected_urls': [{
    'url': 'http://club-fox.ru/afisha_club',
    'positives': 6,
    'total': 66,
    'scan_date': '2018-11-15 14:49:40'
  }],
  'verbose_msg': 'IP address in dataset',
  'detected_downloaded_samples': [{
    'date': '2018-11-13 06:43:32',
    'positives': 6,
    'total': 59,
    'sha256': 'aebbdfb2008fc7aefd070bc25bdc3ec5ab222d2619b28ce6a0311d10a57fc00f'
  }],
  'resolutions': [{
    'last_resolved': '2013-04-01 00:00:00',
    'hostname': '027.ru'
  }],
  'asn': '25532'
}

const URL_REPORT_PAYLOAD = {
  'scan_id': '1db0ad7dbcec0676710ea0eaacd35d5e471d3e11944d53bcbd31f0cbd11bce31-1542650661',
  'resource': 'http://www.virustotal.com',
  'url': 'http://www.virustotal.com/',
  'response_code': 1,
  'scan_date': '2018-11-19 18:04:21',
  'permalink': 'https://www.virustotal.com/url/1db0ad7dbcec0676710ea0eaacd35d5e471d3e11944d53bcbd31f0cbd11bce31/analysis/1542650661/',
  'verbose_msg': 'Scan finished, scan information embedded in this object',
  'filescan_id': null,
  'positives': 0,
  'total': 69,
  'scans': {
    'CLEAN MX': { 'detected': false, 'result': 'clean site' }
  }
}

const URL_SCAN_PAYLOAD = {
  'permalink': 'https://www.virustotal.com/url/1db0ad7dbcec0676710ea0eaacd35d5e471d3e11944d53bcbd31f0cbd11bce31/analysis/1542652039/',
  'resource': 'http://www.virustotal.com/',
  'url': 'http://www.virustotal.com/',
  'response_code': 1,
  'scan_date': '2018-11-19 18:27:19',
  'scan_id': '1db0ad7dbcec0676710ea0eaacd35d5e471d3e11944d53bcbd31f0cbd11bce31-1542652039',
  'verbose_msg': 'Scan request successfully queued, come back later for the report'
}

module.exports = {
  EXPECTED_API_KEY: EXPECTED_API_KEY,
  DOMAIN_REPORT_PAYLOAD: DOMAIN_REPORT_PAYLOAD,
  FILE_REPORT_PAYLOAD: FILE_REPORT_PAYLOAD,
  FILE_RESCAN_PAYLOAD: FILE_RESCAN_PAYLOAD,
  IP_REPORT_PAYLOAD: IP_REPORT_PAYLOAD,
  URL_REPORT_PAYLOAD: URL_REPORT_PAYLOAD,
  URL_SCAN_PAYLOAD: URL_SCAN_PAYLOAD
}
