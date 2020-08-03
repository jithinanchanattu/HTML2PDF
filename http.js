const http = require('http');
const url = require('url');
const puppeteer = require('puppeteer');

async function printPDF(URLPath, PDFLink, PDFRand) {
    const browser = await puppeteer.launch({ headless: true, defaultViewport: null });
    const page = await browser.newPage();
    //waitUntil: ‘networkidle0’ option means that Puppeteer considers navigation to be finished
    await page.goto(URLPath, {waitUntil: 'networkidle0'}); 
    await page.waitFor('.home-template');
    var rand             = '';
    if(PDFRand == "Y" || PDFLink == undefined){
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
    
    const pdf = await page.pdf({ 
          path: PDFLink + '.pdf',
          format: 'A4',
          printBackground: true,
          margin: {
              left: '0px',
              top: '0px',
              right: '0px',
              bottom: '0px'
          } 
      });
    await browser.close();
    //return pdf; //This will return a buffer with the proper content type to the callback
  };

http.createServer(function (req, res) {
  const queryObject = url.parse(req.url,true).query;
  var URLPath, PDFLink, PDFRand;
  for (var p in queryObject){    
      if(queryObject[p] != undefined && p == "URLPath"){
        URLPath = Buffer.from(queryObject[p], 'base64').toString();
        console.log(URLPath);
        var buffer = printPDF(URLPath, queryObject[PDFLink], queryObject[PDFRand]).then((response) => {
            console.log('Converting to PDF');
          })
        .catch(err => console.log(err));
      }    
  } 

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Feel free to add query parameters to the end of the url. <br/>Example: http://localhost:8080/http.js?URLPath=aHR0cHM6Ly9ibG9nLnJpc2luZ3N0YWNrLmNvbQ==&PDFRand=Y&PDFLink=RzpcSUJTXFBERkV4cG9ydFxFeHBvcnRDb21tYW5kZXJc');
}).listen(8080);