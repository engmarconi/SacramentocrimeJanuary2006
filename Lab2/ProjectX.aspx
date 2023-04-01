<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ProjectX.aspx.cs" Inherits="Lab2.ProjectX" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
 	<link rel="stylesheet" href="Styles/okafor.css"> 
	<title>Okafor - ProjectX</title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
             <!--  Adding Naviagtion Bar  --> 
		<nav>
			<div class="nav-wrapper">
			  <div class="nav-left">
				<a href=".#">Okafor <i class="fa fa-user"></i></a>
			  </div>
			  <div class="nav-right">
				<a href="Okafor.aspx" class="pageLink" target="_self">Okafor  <i class="fa fa-user"></i></a>
				<a href="BasicMap.aspx" class="pageLink" target="_self">Basic Map <i class="fa fa-map"></i></a>
				<a href="ProjectX.aspx" class="pageLink" target="_self">ProjectX <i class="fa fa-bolt"></i></a>
                  <a href="CSVMap.aspx" class="pageLink" target="_self">CSVMap <i class="fa fa-file"></i></a>
                        <a href="EuropeanCountryName.aspx" class="pageLink" target="_self">European Country Name <i class="fa fa-file"></i></a>
			  </div>
			</div>
		 </nav>

      <div class="coure_title">
          <h1>Country Analysis</h2>
          <h2>Web GIS (METH 6005) Lab 1</h1>
      </div>



         <div class="map_conteainer">
                <div id="okafor_projectx_map"> </div>
         </div>
        <div id="Markers" runat="server"></div>

       <section class="body country_info">     
          <h2>Liberia</h2>
          <div class="liberia">   
            <p>    
            Liberia began in the early 19th century as a project of the American Colonization Society (ACS),
             which believed black people would face better chances for freedom and prosperity in Africa than 
             in the United States.[7] Between 1822 and the outbreak of the American Civil War in 1861, more 
             than 15,000 freed and free-born black people who faced social and legal oppression in the U.S., 
             along with 3,198 Afro-Caribbeans, relocated to Liberia.[8] Gradually developing an Americo-Liberian 
             identity,[9][10] the settlers carried their culture and tradition with them; the Liberian constitution 
             and flag were modeled after those of the U.S., while its capital was named after ACS supporter and 
             U.S. President James Monroe. Liberia declared independence on July 26, 1847, which the U.S. 
             did not recognize until February 5, 1862. On January 3, 1848, Joseph Jenkins Roberts, a wealthy, free-born African American from the U.S. state of Virginia who settled in Liberia, was elected Liberia's first president after the people proclaimed independence.[8]
         </p> 
         <p>
            Liberia was the first African republic to proclaim its independence and is Africa's first and oldest modern republic. It was among the few African countries to maintain its sovereignty during the Scramble for Africa. During World War II, Liberia supported the United States war effort against Germany, and in turn received considerable American investment in infrastructure, which aided the country's wealth and development. President William Tubman encouraged economic and political changes that heightened the country's prosperity and international profile; Liberia was a founding member of the League of Nations, United Nations, and the Organisation of African Unity.
        </p>        
           <footer class="citation">
                  <i>https://en.wikipedia.org/wiki/Liberia</i><br>
                  <a href="https://en.wikipedia.org/wiki/Liberia"> https://en.wikipedia.org/wiki/Liberia</a><br>
                  <a href="https://www.emansion.gov.lr/"> Liberia - official website</a>
            </footer>
           
          </div>
        </section>




    

    <script src="Js/okafor.js"></script> 
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAX6haxPnf_GlOOJLMl4XX-_y9id7NBzh8&callback=LoadMap" async></script>
        </div>
    </form>
</body>
</html>
