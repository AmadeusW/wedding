module.exports = function (context, req) {
    context.log('Request: ' + JSON.stringify(req));
    // TODO: see what happens when magic is gone
    var data = context.bindings.weddingTable;

    if (data) {
        var data = {
            name: data.Name ? data.Name : "invalid",
            response: data.Response ? data.Response : "",
            music: data.Music ? data.Music : "",
            food: data.Food ? data.Food : ""
        }
        res = {
            // status: 200, /* Defaults to 200 */
            body: data
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