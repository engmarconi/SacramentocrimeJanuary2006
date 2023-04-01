<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="EuropeanCountryName.aspx.cs" Inherits="Lab2.EuropeanCountryName" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link rel="stylesheet" href="Styles/okafor.css">
    <title>Okafor - European Country Name</title>
</head>
<body>
        

        <div>
            <!--  Adding Naviagtion Bar -->

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
                <h1>European Country Name</h1>
                <h2>Web CSV Uploader Lab 4</h2>
            </div>
            
            <div id="OkaforObject" runat="server"></div>

             <section class="body">
                 <div>
                <select id="select">
                    <option value="DRIVING">Driving</option>
                    <option value="TRANSIT">Transit</option>
                    <option value="BICYCLING">Bicycling</option>
                    <option value="WALKING">Walking</option>
                </select>
            </div>
                <div id="okafor"></div>
             </section>

            <script src="Js/countryname.js"></script>
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAX6haxPnf_GlOOJLMl4XX-_y9id7NBzh8&libraries=visualization&callback=initMap"></script>
            
        </div>
</body>
</html>
