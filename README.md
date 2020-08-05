# Welcome to HTML2PDF!

**HTML2PDF** is a plugin tool developed using "**Puppeteer**" which is a Node library which provides a high-level API to control Chrome or Chromium over the [DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/). Puppeteer runs [headless](https://developers.google.com/web/updates/2017/04/headless-chrome) by default, but can be configured to run full (non-headless) Chrome or Chromium.

# Dependencies
|                |Reference Link            |Version                         
|----------------|-------------------------------|-----------------------------|
|NodeJS|[https://nodejs.org/en/](https://nodejs.org/en/)            |`10+`            
# Installation
Check out the following repo!, https://github.com/jithinanchanattu/HTML2PDF.git

To run in your local, run the following in cmd from the checked out root folder:
npm i 

The app can logic can be used inside the angular app or can be hosted in a server and can be called directly. (Note: Nessesary code changes needs to be done)

[![Gitter](https://camo.githubusercontent.com/da2edb525cde1455a622c58c0effc3a90b9a181c/68747470733a2f2f6261646765732e6769747465722e696d2f4a6f696e253230436861742e737667)](https://medium.com/@getjithin)

Most things that you can do manually in the browser can be done using Puppeteer! Here are a few examples to get you started:

-   Generate screenshots and PDFs of pages.
-   Crawl a SPA (Single-Page Application) and generate pre-rendered content (i.e. "SSR" (Server-Side Rendering)).
-   Automate form submission, UI testing, keyboard input, etc.
-   Create an up-to-date, automated testing environment. Run your tests directly in the latest version of Chrome using the latest JavaScript and browser features.
-   Capture a  [timeline trace](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference)  of your site to help diagnose performance issues.
-   Test Chrome Extensions.

# Parameter Arguments
**URLPath:** Target HTTP link to the website which needs to be converted to PDF.

**PDFRand:** Values - "Y" or "N". For enabling the random file name for exportPDF.

**PDFMerge:** Values - "Y" or "N". For merging multiple PDF files.

**PDFLink:** Either the file name for exportPDF or relative path to destination.

Sample URL: 
http://localhost:8080/http.js?URLPath=aHR0cHM6Ly9ibG9nLnJpc2luZ3N0YWNrLmNvbQ==&PDFRand=N&PDFMerge=Y&PDFLink=ExportPDF

## Config file

All the app level configuration can be made in the config file placed in the below location,
Path: "<root>.\config\config.js"
```
//satic data to don't have to generate the conf_adata 2 times
let config_data = null
module.exports = function() {
// if the static data was already set. return it
if(config_data != null && config_data != undefined) {
return config_data
}

config_data = {
"port": 8080,
"static_variable": "static",
"randFileName": false,
"pdf": {
"defFileName":"exportPDF",
"defPath": "./dump/",
"format": "A4",
"displayHeaderFooter": true,
"headerTemplate": '<div style="text-align: center;background: #1abc9c;color: white;font-size: 30px;"><h1>Header</h1><p>My supercool header</p></div>',
"printBackground": true,
"margin": {
"left": "0px",
"top": "200px",
"right": "0px",
"bottom": "0px",
}
},
"mergePDF":{
"destPath":"./dump"
}
}
return config_data
}
```
