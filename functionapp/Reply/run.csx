#r "Microsoft.WindowsAzure.Storage"
using Microsoft.WindowsAzure.Storage.Table;
using System.Net;

public static async Task<HttpResponseMessage> Run(Item item, CloudTable weddingTable, TraceWriter log)
{
    log.Info("Received " + item.ToString());
    item.PartitionKey = "guest";
    item.RowKey = "666";
    item.ETag = "*";

    var operation = TableOperation.Replace(item);
    await weddingTable.ExecuteAsync(operation);

    return new HttpResponseMessage(HttpStatusCode.NoContent);
}

public class Item : TableEntity
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