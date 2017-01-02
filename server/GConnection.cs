using Google.GData.Client;
using Google.GData.Extensions;
using Google.GData.Spreadsheets;

namespace AmadeusW.WedWeb
{
    public class GConnection
    {
        public void DoWork()
        {
            Connect();
            GetSpreadsheets();
        }

        private void Connect()
        {
            SpreadsheetsService myService = new SpreadsheetsService("exampleCo-exampleApp-1");
            myService.setUserCredentials("jo@gmail.com", "mypassword");
        }

        private void GetSpreadsheets()
        {
            SpreadsheetQuery query = new SpreadsheetQuery();
            SpreadsheetFeed feed = myService.Query(query);

            Console.WriteLine("Your spreadsheets: ");
            foreach (SpreadsheetEntry entry in feed.Entries)
            {
                Console.WriteLine(entry.Title.Text);
            }
        }
    }
}
