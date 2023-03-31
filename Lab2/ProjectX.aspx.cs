using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Lab2
{ 
    public partial class ProjectX : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var items = new List<Oafor> {
                           new Oafor { Lat=6.315607, Lng=-10.807370, Message="Monrovia" },
                           new Oafor { Lat=6.30054, Lng= -10.7969, Message="Seat of Goverment" },
                           new Oafor { Lat=6.233665732, Lng= -10.357331904, Message="International Airport" },
                           new Oafor { Lat=6.04229, Lng= -8.11895, Message="Prison" },
                           new Oafor { Lat=6.319444, Lng= -10.802222, Message="Gabriel Tucker Bridge" },
                           new Oafor { Lat=6.29807295, Lng= -10.7958279, Message="St. Paul Bridge" },
                           new Oafor { Lat=4.3665, Lng= -7.724, Message="Port of Harper" },
                           new Oafor { Lat=6.28342, Lng= -10.68999, Message="Benson Hospital" },
                           new Oafor { Lat=6.28342, Lng= -10.68999, Message="Worship Center" },
                           new Oafor { Lat=6.287862, Lng= -10.769246, Message="School" },
                           new Oafor { Lat=6.257009, Lng= -10.702071, Message="Sport" },
                           new Oafor { Lat=6.321105, Lng= -10.806440, Message="Open Market" },
                           new Oafor { Lat=6.364633372032672, Lng= -10.788425560357664, Message="Island" },
                           new Oafor { Lat=8.4911241, Lng= -9.7199624, Message="Security/Military/Defense establishment" },
                           new Oafor { Lat=6.3631642, Lng= -10.7562464, Message="Police Station" },
                           new Oafor { Lat=6.4280502, Lng= -9.4995396, Message="Internatiomal Border" },
                           new Oafor { Lat=5.318334, Lng= -4.015610, Message="Embassy" },
                           new Oafor { Lat=6.313603, Lng= -10.799306, Message="Radio Tower" },
                           new Oafor { Lat=6.316679, Lng= -10.804170, Message="Nuseum/Statue" },
                           new Oafor { Lat=6.372062, Lng= -10.788939, Message="Market" },
                           new Oafor { Lat=6.318739, Lng= -10.807485, Message="Market" },
                           new Oafor { Lat=6.321105, Lng= -10.806440, Message="Market" },
                           new Oafor { Lat=6.292358, Lng= -10.759765, Message="Market" }
                        };

            foreach (Oafor item in items)
            {
                System.Web.UI.HtmlControls.HtmlGenericControl objectSpan = new System.Web.UI.HtmlControls.HtmlGenericControl("span");
                objectSpan.Attributes.Add("lat", item.Lat.ToString());
                objectSpan.Attributes.Add("lng", item.Lng.ToString());
                objectSpan.Attributes.Add("message", item.Message);
                Markers.Controls.Add(objectSpan);
            };
        }
    }
}