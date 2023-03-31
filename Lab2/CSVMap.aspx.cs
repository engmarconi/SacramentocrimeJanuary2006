using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

namespace Lab2
{
    public partial class CSVMap : System.Web.UI.Page
    {
        private OmniDataImporter omniDataImporter = new OmniDataImporter();
        List<Marker> markers = new List<Marker>();

        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if ((FileUploader.PostedFile != null) && (FileUploader.PostedFile.ContentLength > 0))
                {
                    string filename = Path.GetFileName(FileUploader.PostedFile.FileName);
                    string SaveLocation = Server.MapPath("upload") + "\\" + filename;
                    try
                    {
                        FileUploader.PostedFile.SaveAs(SaveLocation);
                        LoadCSVDataFromFile(SaveLocation);
                    }
                    catch (Exception ex)
                    {
                        FileUploadStatus.Text = "Error: " + ex.Message;
                    }
                }
                else
                {
                    FileUploadStatus.Text = "Please select a file to upload.";
                }
            }
            catch (Exception ex)
            {

            }
        }


        private void LoadCSVDataFromFile(String file)
        {
            try
            {
                FileUploadStatus.Text = "The file has been uploaded.";
                markers = omniDataImporter.ReadFile(file);
                PutTheCSVOnTheFile();
            }
            catch (Exception ex)
            {

            }
        }

        private void PutTheCSVOnTheFile()
        {
            try
            {
                FileUploadStatus.Text = "The file has been uploaded.";
                foreach (Marker marker in markers)
                {
                    HtmlGenericControl objectSpan = new HtmlGenericControl("span");
                    objectSpan.Attributes.Add("lat", marker.Lat.ToString());
                    objectSpan.Attributes.Add("lng", marker.Lng.ToString());
                    objectSpan.Attributes.Add("weight", marker.Weight.ToString());
                    OkaforObject.Controls.Add(objectSpan);
                }
            }
            catch (Exception ex)
            {

            }
        }

    }

    public class OmniDataImporter
    {
        public List<Marker> ReadFile(string file)
        {
            List<Marker> markers = new List<Marker>();
            try
            {
                using (var sr = new StreamReader(file))
                {
                    var content = sr.ReadToEnd();
                    if (content != null)
                    {
                        var lines = content.Split('\r');
                        foreach (var line in lines)
                        {
                            var fields = line.Split(',');
                            if (fields.Count() != 9)
                                continue;

                            Marker marker = new Marker
                            {
                                Weight = Convert.ToDouble(fields[6]),
                                Lat = Convert.ToDouble(fields[7]),
                                Lng = Convert.ToDouble(fields[8]),
                            };
                            markers.Add(marker);
                        }
                    }
                }
            }
            catch { }
            return markers;
        }
    }

    public class Marker
    {
        public double Weight;
        public double Lat;
        public double Lng;
    }
}