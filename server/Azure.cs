using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using System;

namespace AmadeusW.WedWeb
{
    public class Azure
    {
        public void SetUp()
        {
            var storageAccount = CloudStorageAccount.Parse(storageConnectionString);
            var tableClient = storageAccount.CreateCloudTableClient();
            CloudTable peopleTable = tableClient.GetTableReference("people");
            peopleTable.Create();
        }
    }
}
