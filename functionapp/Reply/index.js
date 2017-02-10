module.exports = function (context, req) {
    context.log('Request: ' + JSON.stringify(req));
    context.log('Query: ' + JSON.stringify(req.query));
    //context.log('Table: ' + JSON.stringify(context.bindings.weddingTable));
    context.log('Check: '+req.query.magic);
    if (req.query.magic !== "") {
        context.log('go!');
        context.log('go2');
        var data = {
            magic: req.query.magic ? req.query.magic : "invalid",
            name: req.query.name ? req.query.name : "invalid",
            name2: req.query.name2 ? req.query.name2 : "",
            response: req.query.response ? req.query.response : "",
            menu1: req.query.menu1 ? req.query.menu1 : "",
            menu2: req.query.menu2 ? req.query.menu2 : "",
            comment: req.query.comment ? req.query.comment : "",
            music: req.query.music ? req.query.music : ""
        };
        context.log('ok');
        console.log('Data: ' + JSON.stringify(data));
        res = {
            status: 200,
            headers: {
                "Content-Type" : "application/json",
                "Access-Control-Allow-Origin": "amadeusw.com"
            },
            body: data
        };
    }
    else {
        console.log('Error');
        res = {
            status: 400,
            body: "Error"
        };
    }
    context.done(null, res);
};