using Newtonsoft.Json;
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
    public partial class EuropeanCountryName : System.Web.UI.Page
    {
        private DataImporter dataImporter = new DataImporter();

        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                string countryBordersFile = Server.MapPath("upload\\CountryBorders.csv");
                string citiesFile = Server.MapPath("upload\\Cities.csv");

                var borders = dataImporter.ParseCountryBorders(countryBordersFile);
                var cities = dataImporter.ParseCities(citiesFile);
                var data = new PageData
                {
                    Cities = cities,
                    CountryBoraders = borders
                };

                HtmlGenericControl objectSpan = new HtmlGenericControl("span");
                objectSpan.Attributes.Add("data", JsonConvert.SerializeObject(data));
                OkaforObject.Controls.Add(objectSpan);
            }
            catch (Exception ex)
            {

            }
        }
    }

    public class DataImporter
    {
        public List<CountryBorader> ParseCountryBorders(string file)
        {
            List<CountryBorader> countryBoraders = new List<CountryBorader>();
            try
            {
                CountryBorader countryBorader = new CountryBorader();
                using (var sr = new StreamReader(file))
                {
                    var content = sr.ReadToEnd();
                    if (content != null)
                    {
                        var lines = content.Split('\r');
                        for(int i =1; i< lines.Length; i++)
                        {
                            var line = lines[i];
                            var fields = line.Split(',');
                            if (fields.Count() != 4)
                                continue;

                            if(countryBorader.country != fields[3].ToString() || countryBorader.part != Convert.ToInt32(fields[2].ToString()))
                            {
                                if (countryBorader.country != null)
                                    countryBoraders.Add(countryBorader);
                                
                                countryBorader = new CountryBorader
                                {
                                    country = fields[3].ToString(),
                                    part = Convert.ToInt32(fields[2].ToString()),
                                    points = new List<Marker>()
                                };
                            }
                            countryBorader.points.Add(new Marker
                            {
                                Lat = Convert.ToDouble(fields[0]),
                                Lng = Convert.ToDouble(fields[1]),
                            });
                        }
                    }
                }
            }
            catch { }
            return countryBoraders;
        }

        public List<City> ParseCities(string file)
        {
            List<City> cities = new List<City>();
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
                            if (fields.Count() != 5)
                                continue;

                            City city = new City
                            {
                                CityName = fields[0].ToString(),
                                Lat = Convert.ToDouble(fields[1]),
                                Lng = Convert.ToDouble(fields[2]),
                                Country = fields[3].ToString(),
                                Weight = Convert.ToDouble(fields[4]),
                            };
                            cities.Add(city);
                        }
                    }
                }
            }
            catch { }
            return cities;
        }
    }

    public class CountryBorader
    {
        public List<Marker> points;
        public int part = 1;
        public string country;
    }

    public class City : Marker
    {
        public string CityName;
        public string Country;
    }

    public class PageData
    {
        public List<City> Cities { get; set; }
        public List<CountryBorader> CountryBoraders { get; set; }
    }
}