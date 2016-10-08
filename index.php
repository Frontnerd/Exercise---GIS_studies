<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Indigenous Languages of Mexico</title>
    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div id="map"></div>



    <script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>

    <?php #load all json files
      foreach (glob('data/*') as $ind => $script) {
        echo "<script src='$script'></script>\n";
      }
    ?>
    <script src="lenguas_Indigena_MX__test.js"></script>
    
    <script src="index.js"></script>
    

    
    
    

  </body>
</html>
