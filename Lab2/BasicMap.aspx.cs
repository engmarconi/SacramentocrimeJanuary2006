using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Lab2
{
    public class Oafor
    {
        public double Lat { get; set; }
        public double Lng { get; set; }
        public string Message { get; set; }
    }

    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var items = new List<Oafor> {
                           new Oafor { Lat=6.315607, Lng=-10.807370,  Message="Monrovia" }, 
                           new Oafor { Lat=6.87064,  Lng= -10.8211,   Message="Tubmanburg, also known as Bomi -mine'" }, 
                           new Oafor { Lat=4.38333,  Lng= -7.58333,   Message="CAVALLA, LIBERIA" },    
                           new Oafor { Lat=7.881106, Lng= -10.319487, Message="Mine" },    
                           new Oafor { Lat=6.401495, Lng= -10.421595, Message="Factory" },    
                           new Oafor { Lat=6.291260, Lng= -10.778940, Message="Mine" },    
                           new Oafor { Lat=8.145278, Lng= -9.927326,  Message="Mount - Mount Wuteve, Liberia" },    
                           new Oafor { Lat=4.3665,   Lng= -7.724,     Message="Port of Harper" },    
                        };


            foreach (Oafor item in items)  {
                 System.Web.UI.HtmlControls.HtmlGenericControl objectSpan = new System.Web.UI.HtmlControls.HtmlGenericControl("span");
                objectSpan.Attributes.Add("lat", item.Lat.ToString()); 
                objectSpan.Attributes.Add("lng", item.Lng.ToString()); 
                objectSpan.Attributes.Add("message", item.Message);
                OkaforObject.Controls.Add(objectSpan);
            } ;
        }
    }
}