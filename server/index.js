var express = require('express')
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
 
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.get('/status', function (req, res) {
  if (req.query === undefined || req.query.name === undefined || req.query.magic === undefined) {
    res.sendStatus(400);
    return;
  }
  console.log("status: " + req.query.name + " ("+req.query.magic+")")
  var azure = require('azure-storage');
  var tables = azure.createTableService();

  tables.retrieveEntity('wedweb', 'guest', req.query.magic, function(error, entity) {
    if (error) {
      handleError(res, error, error.statusCode || 404);
      return;
    }
    res.json({
      name: entity.Name ? entity.Name._ : "invalid",
      response: entity.Response ? entity.Response._ : "-1",
      music: entity.Music ? entity.Music._ : "",
      food: entity.Food ? entity.Food._ : ""
    });
  });
})

app.get('/respond', function (req, res) {
  if (req.query === undefined || req.query.name === undefined || req.query.magic === undefined) {
    res.sendStatus(400);
    return;
  }
  console.log("respond: " + req.query.name + " ("+req.query.magic+")")
  var azure = require('azure-storage');
  var tables = azure.createTableService();

  tables.retrieveEntity('wedweb', 'guest', req.query.magic, function(error, entity) {
    if (error) {
      handleError(res, error, error.statusCode || 404);
      return;
    }

    entity.Response = req.query.response;
    entity.Food = req.query.food;
    entity.Music = req.query.music;

    tables.replaceEntity('wedweb', entity, function(error) {
      if (error) {
        handleError(res, error, error.statusCode || 500);
        return;
      }
      res.json({
        response: entity
      });
    });
  });
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


function handleError(res, error, status) {
  console.log(JSON.stringify(error));
  res.sendStatus(status);
}