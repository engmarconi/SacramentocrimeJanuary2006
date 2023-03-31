<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CSVMap.aspx.cs" Inherits="Lab2.CSVMap"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link rel="stylesheet" href="Styles/okafor.css">
    <title>Okafor - CSVMap</title>
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
                    </div>
                </div>
            </nav>

            <div class="coure_title">
                <h1>CSV MAP</h1>
                <h2>Web CSV Uploader Lab 3</h2>
            <form id="form1" runat="server">  
                <div>  
                    <p>Browse to Upload File</p>  
                    <asp:FileUpload ID="FileUploader" runat="server" accept=".csv"   onchange="form.submit()"/>  
                </div>  
            </form>  
            <p>  
                <asp:Label runat="server" ID="FileUploadStatus"></asp:Label>  
            </p>  
            </div>

            
            <div id="OkaforObject" runat="server"></div>
             <section class="body">
                <div id="okafor"></div>
             </section>

            <script src="Js/csvmap.js"></script>
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAX6haxPnf_GlOOJLMl4XX-_y9id7NBzh8&callback=initMap"></script>
            
        </div>
</body>
</html>
