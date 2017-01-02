using System;

namespace AmadeusW.WedWeb
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            var google = new GConnection();
            google.DoWork();
            Console.WriteLine("---");
        }
    }
}
