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
        "defExportPath":"./exportFiles/",
        "defFileName":"exportPDF",
        "defPath": "./mergeFiles/",
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
        "destPath":"./mergedFile"
    }
}
return config_data
}