var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    qs = require('querystring'),
    scrypt = require('./scrypt.js'),
    port = process.env.PORT || process.argv[2] || 8888;


http.createServer(function(request, response) {
  if (request.method == 'POST') {
      var body = '';

      request.on('data', function (data) {
          body += data;

          // Too much POST data, kill the connection!
          // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
          if (body.length > 1e6)
              request.connection.destroy();
      });

      request.on('end', function () {
          var post = qs.parse(body);
          hash = post["hash"]
          pass = post["pass"]
          scrypt.Crypto_scrypt(
            hash,
            pass,
            32, 8, 1, 64, function(result){
          		post["mash"] = String.fromCharCode.apply(null, result).replace(/[^\x20-\x70]/g, "");
              fs.readFile("index.html", "binary", function(err, file) {
                response.writeHead(200);
                ["mash","hash","pass"].forEach(function(value,index) {
                  file = file.replace("<input name=\""+value+"\"","<input name=\""+value+"\" value=\""+post[value]+"\"")
                })
                file = file.replace("password","p@ssword")
                response.write(file, "binary");
                response.end();
              });
            }
          );
      });
  } else {
    fs.readFile("index.html", "binary", function(err, file) {
      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  }


}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");
