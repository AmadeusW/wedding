#r "Microsoft.WindowsAzure.Storage"
using Microsoft.WindowsAzure.Storage.Table;
using System.Net;

public static async Task<HttpResponseMessage> Run(Item item, CloudTable outputTable, TraceWriter log)
{
    log.Info("Received a reply");
    log.Info(item);
    item.PartitionKey = "guest";
    item.RowKey = item.magic;
    item.ETag = "*";
    log.Info(item);
    var operation = TableOperation.Replace(item);
    await outputTable.ExecuteAsync(operation);

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
}