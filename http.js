const http = require('http');
const url = require('url');
const puppeteer = require('puppeteer');
const combinePdfs = require("combine-multiple-pdfs");
const config_data = require("./config/config.js")();

async function printPDF(URLPath, PDFLink, PDFRand, PDFMerge) {
    const browser = await puppeteer.launch({ headless: true, defaultViewport: null });
    const page = await browser.newPage();
    //waitUntil: ‘networkidle0’ option means that Puppeteer considers navigation to be finished
    await page.goto(URLPath, {waitUntil: 'networkidle0', timeout: 0}); 
    //await page.waitFor('.home-template');
    var rand = '';
    if((PDFRand == "Y" || PDFLink == undefined) && config_data.randFileName){
        //Random PDF Name    
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 10; i++ ) {
            rand += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        PDFLink = (PDFLink == undefined?rand:PDFLink+rand);
    }else{
        PDFLink = PDFLink;
    }

    if(PDFLink == undefined || PDFLink == null){
      PDFLink = config_data.pdf.defFileName;
    }
    
    const pdf = await page.pdf({ 
          path: PDFLink + '.pdf',
          displayHeaderFooter: config_data.pdf.displayHeaderFooter,
          headerTemplate: config_data.pdf.headerTemplate,
          format: config_data.pdf.format,
          printBackground: config_data.pdf.printBackground,
          margin: {
              left: config_data.pdf.margin.left,
              top: config_data.pdf.margin.top,
              right: config_data.pdf.margin.right,
              bottom: config_data.pdf.margin.bottom
          }
      });
    await browser.close();
    //return pdf; //This will return a buffer with the proper content type to the callback
  };

async function mergePDF(pdfPath, PDFMerge) {
  var dest_file_path = config_data.mergePDF.destPath;
  let data = pdfPath;
  if(PDFMerge == "Y"){
    let options = { outName: "mergedPdf", outPath: dest_file_path };
    let newFileBuffer = combinePdfs(data, options);
    console.log('Merged to PDF');
  }
}
http.createServer(function (req, res) {
  const queryObject = url.parse(req.url,true).query;
  var URLPath, PDFLink, PDFRand, PDFMerge;
  
  for (var p2 in queryObject){    
    if(queryObject[p2] != undefined && p2 == "PDFLink"){
      PDFLink = queryObject[p2];
    }
  }
  for (var p3 in queryObject){    
    if(queryObject[p3] != undefined && p3 == "PDFMerge"){
      PDFMerge = queryObject[p3];
    }
  }

  for (var p in queryObject){  
    if(queryObject[p] != undefined && p == "URLPath"){
      URLPath = Buffer.from(queryObject[p], 'base64').toString();

      var buffer = printPDF(URLPath, PDFLink, "", PDFMerge).then((response) => {
        console.log('Converted to PDF');
        mergePDF(["./1.pdf", "./2.pdf", "./3.pdf"], "Y");
      })
    .catch(err => console.log(err));
    }
  }


  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end("Feel free to add query parameters to the end of the url. <br/>Sample Request Links: <br/>http://localhost:8080/http.js?<b>URLPath</b>=aHR0cHM6Ly9ibG9nLnJpc2luZ3N0YWNrLmNvbQ==&<b>PDFRand</b>=N&<b>PDFMerge</b>=Y&<b>PDFLink</b>=ExportPDF <br/> http://localhost:8080/http.js?<b>URLPath</b>=aHR0cHM6Ly9ibG9nLnJpc2luZ3N0YWNrLmNvbQ==&<b>PDFRand</b>=Y&<b>PDFMerge</b>=Y&<b>PDFLink</b>=G:\\IBS\\PDFExport\\ExportCommander\\<br/><br/>  <p>Enter the URL below details to create link: </p><input value=\"https://blog.risingstack.com/\" placeholder=\"genURL\" id=\"genURL\" onchange=\"document.getElementById('URLPath').innerHTML = btoa(document.getElementById('genURL').value)\"></input><input placeholder=\"Merge PDF (Y/N)\" id=\"mergePDF\" onchange=\"document.getElementById('PDFMerge').innerHTML = document.getElementById('mergePDF').value\"></input><input placeholder=\"genPDF FileName\" id=\"genFileName\" onchange=\"document.getElementById('PDFLink').innerHTML = (document.getElementById('genFileName').value)\"></input><p>http://localhost:8080/http.js?URLPath=<span id=\"URLPath\"></span>&amp;PDFRand=N&amp;PDFMerge=<span id=\"PDFMerge\"></span>&amp;PDFLink=<span id=\"PDFLink\"></span></p>");
}).listen(8080);