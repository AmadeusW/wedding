#r "Microsoft.WindowsAzure.Storage"

using Microsoft.WindowsAzure.Storage.Table;
using System.Net;
using Microsoft.ApplicationInsights;
using Microsoft.ApplicationInsights.DataContracts;
using Microsoft.ApplicationInsights.Extensibility;

private static TelemetryClient telemetry = new TelemetryClient();
private static string key = TelemetryConfiguration.Active.InstrumentationKey = System.Environment.GetEnvironmentVariable("APPINSIGHTS_INSTRUMENTATIONKEY", EnvironmentVariableTarget.Process);

public static async Task<HttpResponseMessage> Run(Response item, CloudTable weddingTable, TraceWriter log)
{
    log.Info("Received " + item.ToString());
    telemetry.TrackEvent("Response", new Dictionary<string, string>{{"item", item.ToString()}});
    try
    {
        var storedItem = new StoredData();
        item.PartitionKey = "guest";
        item.RowKey = item.magic;
        item.ETag = "*";
        storedItem.name = item.name;
        storedItem.name2 = item.name2;
        storedItem.response = item.response;
        storedItem.menu1 = item.menu1;
        storedItem.menu2 = item.menu2;
        storedItem.comment = item.comment;
        storedItem.music = item.music;

        var operation = TableOperation.Replace(storedItem);
        await weddingTable.ExecuteAsync(operation);

        return new HttpResponseMessage(HttpStatusCode.NoContent);
    }
    catch (System.Exception e)
    {
        telemetry.TrackException(e);
        throw;
    }
    
}

public class Response
{
    public string magic { get; set; }
    public string name { get; set; }
    public string name2 { get; set; }
    public string response { get; set; }
    public string menu1 { get; set; }
    public string menu2 { get; set; }
    public string comment { get; set; }
    public string music { get; set; }

    public override string ToString()
    {
        return $@"
        {{
            magic: ""{magic}"",
            name: ""{name}"",
            name2: ""{name2}"",
            response: ""{response}"",
            menu1: ""{menu1}"",
            menu2: ""{menu2}"",
            comment: ""{comment}"",
            music: ""{music}"",
        }}";
    }
}

public class StoredData : TableEntity
{
    public string RowKey { get; set; }
    public string name { get; set; }
    public string name2 { get; set; }
    public string response { get; set; }
    public string menu1 { get; set; }
    public string menu2 { get; set; }
    public string comment { get; set; }
    public string music { get; set; }

    public override string ToString()
    {
        return $@"
        {{
            RowKey: ""{RowKey}"",
            name: ""{name}"",
            name2: ""{name2}"",
            response: ""{response}"",
            menu1: ""{menu1}"",
            menu2: ""{menu2}"",
            comment: ""{comment}"",
            music: ""{music}"",
        }}";
    }
}
