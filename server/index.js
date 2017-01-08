var express = require('express')
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
 
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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


app.get('/status', function (req, res) {
    var azure = require('azure-storage');
    
    var ts = azure.createTableService();
    console.log(JSON.stringify(ts));
    var guest = ts.retrieveEntity('wedweb', 'guest', req.query.magic)
    console.log(JSON.stringify(guest));

  res.send("basic");
})

app.get('/respond', function (req, res) {
  res.send("respond");
})

app.listen(3000)