using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace emailApp
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        List<string[]> csv;
        int index = 0;
        const string raw = @"Dear {0},
 
We're getting married on April 22nd in Vancouver and we'd love for you to join us!
The invitation will come next week.
 
We're looking forward to seeing you!
  Amadeusz & Bianca";

        private void LoadClick(object sender, RoutedEventArgs e)
        {
            var contents = File.ReadAllText((locationBox.Text).Trim('\"')).Split('\n');
            csv = contents.Select(n => n.Split(',').ToArray()).ToList();
            index = 0;
            focusedElement = -1;
            DisplayData();
        }

        private void PreviousClick(object sender, RoutedEventArgs e)
        {
            previous();
        }

        private void previous()
        {
            if (index > 0)
                index--;

            DisplayData();
        }

        private void NextClick(object sender, RoutedEventArgs e)
        {
            next();
        }

        private void next()
        {
            if (index < csv.Count() - 1)
                index++;
            DisplayData();
        }

        private void SaveClick(object sender, RoutedEventArgs e)
        {
            save();
        }

        private void save()
        {
            csv[index][6] = "sent";
            DisplayData();

            using (StreamWriter file = new StreamWriter((locationBox.Text).Trim('\"')))
            {
                foreach (var row in csv)
                {
                    file.Write(String.Join(",", row));
                }
            }
        }

        private void DisplayData()
        {
            var guest = csv[index];
            var fn1 = guest[9].Trim();
            //var ln1 = guest[1].Trim();
            var fn2 = guest[10].Trim();
            //var ln2 = guest[3].Trim();
            var e1 = guest[0].Trim();
            var e2 = guest[1].Trim();
            var sent = guest[12].Trim();

            var name = $"{fn1}";
            if (!String.IsNullOrWhiteSpace(fn2))
                name += $" and {fn2}";

            var content = String.Format(raw, name);

            var email = e1;
            if (!String.IsNullOrWhiteSpace(e2))
                email += $"; {e2}";

            addressBox.Text = email;
            subjectBox.Text = "Save the date for Amadeusz and Bianca";
            emailBox.Text = content;
            savedToggle.IsChecked = sent == "sent";
            savedToggle.Content = savedToggle.IsChecked.Value ? "sent (Ctrl + s)" : "send (Ctrl + s)";
        }

        private void Window_PreviewKeyDown(object sender, KeyEventArgs e)
        {
            if (e.Key == Key.S && e.KeyboardDevice.Modifiers == ModifierKeys.Control)
            {
                save();
                e.Handled = true;
            }

            if (e.Key == Key.Space && e.KeyboardDevice.Modifiers == ModifierKeys.Control)
            {
                copyData();
                e.Handled = true;
            }
        }

        int focusedElement; 

        private void copyData()
        {
            focusedElement++;
            if (focusedElement == 3)
            {
                next();
                focusedElement = 0;
            }

            switch(focusedElement)
            {
                case 0:
                    addressBox.Focus();
                    addressBox.SelectAll();
                    Clipboard.SetText(addressBox.Text);
                    break;
                case 1:
                    subjectBox.Focus();
                    subjectBox.SelectAll();
                    Clipboard.SetText(subjectBox.Text);
                    break;
                case 2:
                    emailBox.Focus();
                    emailBox.SelectAll();
                    Clipboard.SetText(emailBox.Text);
                    break;
                default:
                    break;
            }
        }
    }
}
