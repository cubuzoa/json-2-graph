var formidable = require("formidable");
var fs = require("fs");

module.exports = function( app ) {

    app.get('/', function(req, res, next) {
    	res.render("index", {
    	  graphData: null,
    	  xkeys: null
    	});
    });
    
    app.post('/', function(req, res, next) {
        var form = new formidable.IncomingForm();
        var bufferString, bufferStringSplit;
        
        form.parse(req, function(err, fields, files) {
          fs.readFile(files.file.path, function (err, data) {
            bufferString = data.toString(); 
            bufferStringSplit = bufferString.split('\n'); 
            var graphData = [];
            var i = 0, item;
            var tmpArr = new Array([]);
            var xKeys = [];
            var labels = [];
            for ( ; item = bufferStringSplit[i++] ; ){ 
                var tmpSplit = item.split(";");
                if (typeof tmpArr[tmpSplit[0]] === 'undefined') {
                  tmpArr[tmpSplit[0]] = [];
                }
                var cacheName = tmpSplit[1].replace("./", "");
                cacheName = cacheName.replace(".", "");
                if (cacheName.length > 0) {
                  
                  tmpArr[tmpSplit[0]].push(cacheName + ":" + tmpSplit[2]);  
                  if (xKeys.indexOf(cacheName) < 0) xKeys.push(cacheName);
                  if (labels.indexOf(cacheName) < 0) labels.push(cacheName);
                }
                
            }
            
            for (var key in tmpArr) {
              if (key != 0) {
                var jsonStr = "{" + tmpArr[key] + ",0:'" + key + "'}";
                graphData.push(jsonStr);  
              }
            }
            res.render("index.ejs", {
              graphData: {
                  element: 'graph',
                  data: graphData,
                  xkey: '0',
                  ykeys: xKeys,
                  labels: labels,
                  pointSize: 2,
                  hideHover: 'auto'
                }
            });
          });
        });
    });
}