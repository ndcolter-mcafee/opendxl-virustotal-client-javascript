### Prerequisites

* OpenDXL JavaScript Client (Node.js) library installed
  * <https://github.com/opendxl/opendxl-client-javascript>

* The OpenDXL JavaScript Client (Node.js) prerequisites must be satisfied
  * <https://opendxl.github.io/opendxl-client-javascript/jsdoc/tutorial-installation.html>

* An instance of the VirusTotal API DXL Service is running and 
  available on the DXL fabric. 
  
  * Available OpenDXL VirusTotal Service solutions:
    * [VirusTotal API DXL JavaScript Service](https://github.com/opendxl/opendxl-virustotal-service-javascript)
    * [VirusTotal API DXL Python Service](https://github.com/opendxl/opendxl-virustotal-service-python)

* Node.js 4.0 or higher installed.

### Installation

Before installing the VirusTotal OpenDXL JavaScript Client library, change to the
directory which you extracted from the SDK zip file. For example:

```sh
cd {@releasezipname}
```

To install the library from a local tarball for a Mac or Linux-based operating
system, run the following command:

```sh
npm install ./lib/{@releasetarballname} --save
```

To install the library from a local tarball for Windows, run:

```sh
npm install .\lib\{@releasetarballname} --save
```

To install the library via the
[npm package registry](https://www.npmjs.com/package/@opendxl/dxl-vtapi-client), run:

```sh
npm install @opendxl/dxl-vtapi-client --save
```
