module.exports = function (context, req) {
    context.log('Request: ' + JSON.stringify(req));
    
    var data = context.bindings.weddingTable;
    context.log(context);
    context.log(data);

    if (data) {
        var response = {
            name: data.name ? data.name : "invalid",
            name2: data.name2 ? data.name2 : "",
            response: data.response ? data.response : "",
            music: data.music ? data.music : "",
            comment: data.comment ? data.comment : "",
            menu1: data.menu1 ? data.menu1 : "",
            menu2: data.menu2 ? data.menu2 : "",
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