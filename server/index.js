var express = require('express')
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
 
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.get('/status', function (req, res) {
  if (req.query === undefined || req.query.name === undefined || req.query.magic === undefined)
    res.status(err.status || 400);
  console.log("Welcome " + req.query.name + "("+req.query.magic+")")

  var azure = require('azure-storage');
  var tables = azure.createTableService('amadeuswstorage', 'HhL2p6dLt2oNNmRRLy1N5aV2zUKuM7ncrAIV7xWPpRQZmITUKaxQPiPIc8aD4XCwpVBUEtjNuFxl');
  console.log(JSON.stringify(tables));
  var x = process.env.AZURE_STORAGE_CONNECTION_STRING;
  console.log(x);
  tables.retrieveEntity('wedweb', 'guest', req.query.magic, function(error, result, response) {
    if (!error) {
      console.log(JSON.stringify(result));
      console.log(JSON.stringify(response));
      res.send("Welcome " + req.query.name + "("+req.query.magic+"). We have your data!");
    }
    else {
      console.log(JSON.stringify(error));
      console.log(JSON.stringify(result));
      console.log(JSON.stringify(response));
      res.send("Welcome " + req.query.name + "("+req.query.magic+"). Error: " + error);
    }
  });

})

app.get('/respond', function (req, res) {
  res.send("respond");
})

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers. TODO: Fix them. they don't seem to work.

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send(JSON.stringify(err));
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.sendFile('D:/wedweb/website/index.html')
});


app.listen(3000)