module.exports = function (context, req) {
    context.log('Request: ' + JSON.stringify(req));
    
    var data = context.bindings.weddingTable;
    context.log(context);
    context.log(data);

    if (data) {
        var response = {
            name: data.Name ? data.Name : "invalid",
            name2: data.Name2 ? data.Name2 : "",
            response: data.Response ? data.Response : "",
            music: data.Music ? data.Music : "",
            comment: data.Comment ? data.Comment : "",
            menu1: data.Menu1 ? data.Menu1 : "",
            menu2: data.Menu2 ? data.Menu2 : "",
            hotelcode: "3A6CU9J6"
        }
        res = {
            status: 200,
            headers: {
                "Content-Type" : "application/json",
                "Access-Control-Allow-Origin": "amadeusw.com"
            },
            body: response
        };
    }
    else {
        res = {
            status: 400,
            body: "Error"
        };
    }
    context.done(null, res);
};